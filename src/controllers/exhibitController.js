const { status_codes, error_codes } = require("../helper/responseHelper");
const ROLE = require("../helper/roleHelper");
const Busboy = require("busboy");
const { inspect } = require("util");
const os = require("os");
const path = require("path");
const fs = require("fs");

function ExhibitController(mongoose, User, Customer, Exhibit, Exhibition, Access, History, Translation) {

  async function getSingleExhibit(req, res) {
    const msg = {};
    const exhibit_id = req.params.exhibitId;
    let result;
    if (req.user.Role === ROLE.GUIDEXP) {
      result = await Exhibit.findOne({ _id: exhibit_id }).lean();
    } else {
      const p1 = Exhibit.findOne({ Customer: req.user.Customer, _id: exhibit_id }).select("_id Exhibition Status Exhibit_Identifier Name Audio_Path Description Translation.Language_Code Translation.Status").lean();
      const p2 = Exhibition.find({ Customer: req.user.Customer }).select("_id Name");
      result = await Promise.all([p1, p2]);
    }
    if (result) {
      res.status(status_codes.OK).send(result);
    } else {
      msg.code = error_codes.ERROR_EXHIBIT_NOT_FOUND;
      msg.message = `Exhibit with id:${exhibit_id} not found in the database`;
      res.status(status_codes.NOT_FOUND).send(msg);
    }
  }


  async function getAllExhibit(req, res) {
    const msg = {};
    const { query } = req;
    if (!query.page) query.page = 1;
    if (query.order) {
      if (["ascend", "descend"].includes(query.order) && ["name", "added_date"].includes(query.col))
        query.order = query.order == "ascend" ? 1 : -1;
      else {
        msg.code = error_codes.ERROR_URL_QUERY;
        msg.message = `Bad Query String: ${query}`;
        return res.status(status_codes.BAD_REQUEST).send(msg);
      }
    }

    const nameSort = [];
    if (query.order) nameSort.push({ $sort: { Name: query.order } });

    const [{ meta, exhibits }] = await Exhibit.aggregate([
      { $match: { Customer: mongoose.Types.ObjectId(req.user.Customer) } },
      {
        $facet: {
          meta: [{ $count: "total" }, { $addFields: { page: query.page } }],
          exhibits: [
            ...nameSort,
            { $limit: 20 },
            { $skip: (query.page - 1) * 20 },
            {
              $project: {
                _id: 0,
                Exhibit: "$_id",
                Name: 1,
                Status: 1,
              }
            }
          ]
        }
      }
    ]);
    return res.status(status_codes.OK).send({ ...meta[0], exhibits });
  }

  async function getAllExhibition(req, res) { }

  async function getSingleExhibition(req, res) { }

  /**
  * MANAGER create a new exhibit
  * req.body: {name, exhibition, languages, audio, description}
  */

  async function postCreateSingleExhibit(req, res) {
    req.files = [];
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      // const saveTo = path.join(path.dirname(require.main.filename), "/public", path.basename(fieldname));
      // file.pipe(fs.createWriteStream(saveTo));
      req.files.push(file);
      file.resume();
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      req.body[fieldname] = val;
    });
    busboy.on('finish', async function () {
      const { name, exhibition, languages, description } = req.body;
      const msg = {};
      let exhibition_languages = [];
      //If this is part of an exhibition, check if the exhibition exists
      if (exhibition) {
        const exhibition_query = await Exhibition.findOne({ Customer: req.user.Customer, _id: exhibition });
        if (!exhibition_query) {
          msg.code = error_codes.ERROR_EXHIBITION_NOT_FOUND;
          msg.message = `No exhibition with id ${exhibiton} found in the database`;
          return res.status(status_codes.NOT_FOUND).send(msg);
        }
        //Loop through exhibition translation
        for (const translation of exhibition_query.Translation) {
          exhibition_languages.push(translation.Language_Code);
        }
      }

      const exhibit = new Exhibit();
      exhibit.Customer = req.user.Customer;
      exhibit.Name = name;
      if (exhibition) exhibit.Exhibition = exhibition;
      exhibit.Status = "Paused";
      exhibit.Description = description;
      //Add the translation
      const exhibit_translation = [];
      if (exhibition) {
        exhibition_languages.forEach((value) => {
          const translation = new Translation();
          translation.Status = "Paused";
          translation.Language_Code = value;
          translation.Description = [];
          exhibit_translation.push(translation);
        });
      } else {
        languages.forEach((value) => {
          const translation = new Translation();
          translation.Status = "Paused";
          translation.Language_Code = value;
          translation.Description = [];
          exhibit_translation.push(translation);
        });
      }
      const parsed_description = JSON.parse(description);
      const { blocks } = parsed_description;
      //Save the references to each block 
      exhibit_translation.forEach((value) => {
        blocks.forEach((block) => {
          const description_block = {};
          description_block.Key = block.key;
          value.Description.push(description_block);
        })
      });
      exhibit.Translation = exhibit_translation;
      //Save the exhibit
      await exhibit.save();
      //Return the id to the client
      msg.message = { "_id": exhibit._id };
      return res.status(status_codes.OK).send(msg);
    });
    req.pipe(busboy);
  }


  async function postCreateSingleExhibition(req, res) {
    const { name, languages, description } = req.body;
    const msg = {};
    const { blocks } = description;
    const exhibition = new Exhibition();
    exhibition.Customer = req.user.Customer;
    exhibition.Name = name;
    exhibition.Stauts = "Paused";
    const exhibition_languages = [];
    languages.forEach((value) => {
      const translation = new Translation();
      translation.Status = "Paused";
      translation.Language_Code = value;
      translation.Description = [];
      exhibition_languages.push(translation);
    })
    exhibition_languages.forEach((value) => {
      blocks.forEach((block) => {
        const description_block = {};
        description_block.Key = block.key;
        value.Description.push(description_block);
      })
    })
    await exhibition.save();
    msg.message = { "_id": exhibition._id };
    return res.status(status_codes.OK).send(msg);
  }


  return {
    getAllExhibit,
    getAllExhibition,
    getSingleExhibit,
    getSingleExhibition,
    postCreateSingleExhibit,
    postCreateSingleExhibition,
  };
}

module.exports = ExhibitController;
