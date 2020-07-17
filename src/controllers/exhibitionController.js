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