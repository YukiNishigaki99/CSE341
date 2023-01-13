const displayName = (req, res, next) => {
    res.json('This function will display the name of someone who you know');
};

const myGrandfather = (req, res, next) => {
    res.json('Fumio Nishigaki');
};

const myGrandmother = (req, res, next) => {
    res.json('Kumiko Nishigaki');
};

module.exports = { displayName, myGrandmother, myGrandfather };