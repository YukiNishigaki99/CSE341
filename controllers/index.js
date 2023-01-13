const myGreatGrandfather = (req, res, next) => {
    res.json('Katsusuke Nishigaki');
};

const myGrandfather = (req, res, next) => {
    res.json('Fumio Nishigaki');
};

const myGrandmother = (req, res, next) => {
    res.json('Kumiko Nishigaki');
};

module.exports = { myGreatGrandfather, myGrandmother, myGrandfather };