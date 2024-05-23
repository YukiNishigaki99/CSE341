const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('diseases').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const diseaseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('diseases').find({
        _id: diseaseId
    });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
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
    const response = await mongodb.getDb().db().collection('diseases').insertOne(disease);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while recording the disease.');
    }
};

const updateDisease = async (req, res) => {
    const diseaseId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
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
        }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the disease.');
    }
};

const deleteDisease = async (req, res) => {
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