const yukiRoute = (req, res) => {
    res.send('Yuki Nishigaki');
}

const fumioRoute = (req, res) => {
    res.send('Fumio Nishigaki');
}

const kumikoRoute = (req, res) => {
    res.send('Kumiko Nishigaki');
}

module.exports = {
    yukiRoute,
    fumioRoute,
    kumikoRoute
};