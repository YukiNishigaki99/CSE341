const validator = require('../helpers/validate');

const saveDisease = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        symptoms: 'required|string',
        whenToSeeDoctor: 'required|string',
        cause: 'required|string',
        riskFactor: 'required|string',
        complication: 'required|string',
        prevention: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveDisease
};