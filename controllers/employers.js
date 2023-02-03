const express = require('express');
const router = express.Router();

/* GET employers index (the module home page) */
router.get('/', (req, res) => {
    res.render('employers/index', {
        title: 'Employer List'
    });
})

// make public
module.exports = router;