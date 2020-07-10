const { status_codes, error_codes } = require("../helper/responseHelper");
const cryto = require("crypto");

function ExhibitController(mongoose, User, Customer, Exhibit, Exhibition, Access, History, Translation) {
  async function getAllExhibit(req, res) { }

  async function getSingleExhibit(req, res) { }


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
    exhibit.description = description;
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
        description_block.key = block.key;
        value.Description.push(description_block);
      })
    });

    //Save the exhibit
    await exhibit.save();
    //Return the id to the client
    msg.message = { "_id": exhibit._id };
    return res.status(status_codes.OK).send(msg);
  }


  return {
    getAllExhibit,
    getSingleExhibit,
    postCreateSingleExhibit,
  };
}

module.exports = ExhibitController;
