const express = require ('express');

const app = express();

//TODO: configure the app
app.get('/todos', (req, res) => {
    res.send('Hello World');
});
app.listen(8080);