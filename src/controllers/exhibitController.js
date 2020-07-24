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
    const exhibit_id = req.params.exhibit_id;
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

  /**
  * MANAGER create a new exhibit
  * req.body: {name, exhibition, languages, audio, description}
  */

  async function postCreateSingleExhibit(req, res) {
    req.files = [];

    //parse multipart data
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      // const saveTo = path.join(path.dirname(require.main.filename), "/public", path.basename(fieldname));
      // file.pipe(fs.createWriteStream(saveTo));
      req.files.push(file);
      file.resume();
    });
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      if (val === "undefined") {
        req.body[fieldname] = null;
      } else {
        req.body[fieldname] = JSON.parse(val);
      }
      if (fieldname === "description") {
        //Keep an copy of the unparse description
        req.body.unparseDescription = val;
      }
    });
    busboy.on('finish', async function () {
      const { name, exhibition, languages, description, unparseDescription } = req.body;
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
      exhibit.Description = unparseDescription;
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
      const { blocks } = description;
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
      msg.message = { exhibit: exhibit._id };
      return res.status(status_codes.OK).send(msg);
    });
    req.pipe(busboy);
  }


  async function getSingleExhibitofLanguage(req, res) {
    const msg = {};
    const { exhibit_id, lang_code } = req.params;
    //Retreat the exhibit 
    const p1 = Exhibit.aggregate([
      { $match: { Customer: mongoose.Types.ObjectId(req.user.Customer), _id: mongoose.Types.ObjectId(exhibit_id), } },
      {
        $facet: {
          languages: [{ $project: { _id: 0, Translation: { $map: { input: '$Translation', as: 'translation', in: "$$translation.Language_Code" } } } }],
          data: [{
            $project: {
              Translation: {
                $filter: {
                  input: '$Translation',
                  as: "translation",
                  cond: { $eq: ["$$translation.Language_Code", lang_code] }
                },
              },
              _id: 1,
              Name: 1,
              Description: 1
            }
          }
          ]
        }
      }
    ]);
    //Retreat the permission
    const p2 = Access.findOne({ Customer: req.user.Customer, OnModel: "Exhibit", Model_Id: exhibit_id }).lean();
    Promise.all([p1, p2]).then((values) => {
      const [exhibit, access] = values;
      if (!exhibit[0].data.length) {
        //No exhibit found
        msg.code = error_codes.ERROR_EXHIBIT_NOT_FOUND;
        msg.message = `No exhibit found with id ${exhibit_id}`;
        return res.status(status_codes.NOT_FOUND).send(msg);
      };
      const found_exhibit = exhibit[0];
      found_exhibit.languages = found_exhibit.languages[0]["Translation"];
      found_exhibit.data = found_exhibit.data[0];
      if (!found_exhibit.data.Translation.length) {
        msg.code = error_codes.ERROR_TRANSLATION_NOT_FOUND;
        msg.message = `Exhibit id ${exhibit_id} has no language with language code of ${lang_code}`;
        return res.status(status_codes.NOT_FOUND).send(msg);
      } else {
        found_exhibit.data.Translation = found_exhibit.data.Translation[0];
      }
      found_exhibit.access = access;
      res.status(status_codes.OK).send(found_exhibit);
    });
  }

  return {
    getAllExhibit,
    getSingleExhibit,
    getSingleExhibitofLanguage,
    postCreateSingleExhibit,
  };
}

module.exports = ExhibitController;
