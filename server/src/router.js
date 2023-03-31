const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');
const router = express.Router();

router.post('/login', require('./routes/loginRoute'));

router.post('/todos',isLoggedIn, require('./routes/createTodoRoute'));
router.get('/todos',isLoggedIn, require('./routes/readTodosRoute'));

module.exports = router;