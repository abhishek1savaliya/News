const express = require('express');
const { getServerDetails } = require('../controllers/serverAliveController');

const router = express.Router();

router.get('/alive', getServerDetails);


module.exports = router;
