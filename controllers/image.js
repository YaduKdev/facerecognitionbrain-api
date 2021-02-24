const clarifai = require("clarifai");

const app = new clarifai.App({
    apiKey: '756284c9b188486b918cad459ae8aec6'
  });

const handleApiCall= (req, res) => {
    app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {res.json(entries[0])})
    .catch(err => {
        res.status(400).json('unable to get entries')
    })
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};