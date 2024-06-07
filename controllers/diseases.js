const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('diseases')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);

        })

};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to find a disease.');
    }
    const diseaseId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('diseases')
        .find({
            _id: diseaseId
        })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const recordDisease = async (req, res) => {
    const disease = {
        name: req.body.name,
        symptoms: req.body.symptoms,
        whenToSeeDoctor: req.body.whenToSeeDoctor,
        cause: req.body.cause,
        riskFactor: req.body.riskFactor,
        complication: req.body.complication,
        prevention: req.body.prevention
    };
    const response = await mongodb.getDb().db().collection('disease').insertOne(disease);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while recording the disease.');
    }
};


const updateDisease = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to update a disease.');
    }
    const diseaseId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const disease = {
        name: req.body.name,
        symptoms: req.body.symptoms,
        whenToSeeDoctor: req.body.whenToSeeDoctor,
        cause: req.body.cause,
        riskFactor: req.body.riskFactor,
        complication: req.body.complication,
        prevention: req.body.prevention
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('diseases')
        .replaceOne({
            _id: diseaseId
        }, disease);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the disease.');
    }
};

const deleteDisease = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid disease id to delete a disease.');
    }
    const diseaseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('diseases').remove({
        _id: diseaseId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the disease.');
    }
};

module.exports = {
    getAll,
    getSingle,
    recordDisease,
    updateDisease,
    deleteDisease
};