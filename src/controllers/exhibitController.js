const { status_codes, error_codes } = require("../helper/responseHelper");

function ExhibitController(mongoose, User, Customer, Exhibit, Exhibition, Access, History) {
  async function getAllExhibit(req, res) { }

  async function getSingleExhibit(req, res) { }


  /**
  * MANAGER create a new exhibit
  * req.body: {name, exhibition, languages, audio, description}
  */
  async function postCreateSingleExhibit(req, res) {
    const { exhibit_name, exhibition, languages, audio, exhibit_description } = req.body;
    const query = {};
    const msg = {};
    let validLanguages = [];
    //check the exhibition validity
    if (exhibition) {
      const exhibition_query = await Exhibition.findById(exhibtion);
      if (!exhibition_query) {
        msg.code = error_codes.ERROR_EXHIBITION_NOT_FOUND;
        msg.message = `No exhibition with id ${exhibiton} found in the database`;
        return res.status(status_codes.NOT_FOUND).send(msg);
      }
      //Loop through exhibition translation
      for (const translation of exhibition_query.Translation) {
        validLanguages.push(translation.Language_Code);
      }
    }

    const { blocks } = description;
    




  }


  return {
    getAllExhibit,
    getSingleExhibit,
    postCreateSingleExhibit,
  };
}

module.exports = ExhibitController;
