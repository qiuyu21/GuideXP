const { status_codes, error_codes } = require("../helper/responseHelper");

function ExhibitController(mongoose, User, Customer, Exhibit, Exhibition, Access, History, Translation) {

  async function getSingleExhibit(req, res) {
    const msg = {};
    const exhibit_id = req.params.exhibitId;

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
    const { name, exhibition, languages, audio, description } = req.body;
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

    const { blocks } = description;
    const exhibit = new Exhibit();
    exhibit.Customer = req.user.Customer;
    exhibit.Name = name;
    if (exhibition) exhibit.Exhibition = exhibition;
    exhibit.Status = "Created";
    exhibit.Description = JSON.stringify(description);
    //Add the translation
    const exhibit_translation = [];
    if (exhibition) {
      exhibition_languages.forEach((value) => {
        const translation = new Translation();
        translation.Status = "Created";
        translation.Language_Code = value;
        translation.Description = [];
        exhibit_translation.push(translation);
      });
    } else {
      languages.forEach((value) => {
        const translation = new Translation();
        translation.Status = "Created";
        translation.Language_Code = value;
        translation.Description = [];
        exhibit_translation.push(translation);
      });
    }
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
  }


  async function postCreateSingleExhibition(req, res) {
    const { name, languages, description } = req.body;
    const msg = {};
    const { blocks } = description;
    const exhibition = new Exhibition();
    exhibition.Customer = req.user.Customer;
    exhibition.Name = name;
    exhibition.Stauts = "Created";
    const exhibition_languages = [];
    languages.forEach((value) => {
      const translation = new Translation();
      translation.Status = "Created";
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
