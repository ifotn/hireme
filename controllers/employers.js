const express = require('express');
const router = express.Router();

// add fs to read the data file
const fs = require('fs');

// use Employer model for CRUD w/mongoose
const Employer = require('../models/employer');

/* GET employers index (the module home page) */
router.get('/', (req, res) => {
    /*const employers = [
        {
            "name": "Provix"
        },
        {
            "name": "Element6"
        },
        {
            "name": "Netgain"
        },
        {
            "name": "44 North"
        }
    ];

    res.render('employers/index', {
        title: 'Employer List',
        employers: employers
    });*/

    // get data from json file
    fs.readFile('./data/employers.json', 'utf8', (err, employers) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(employers);
            res.render('employers/index', {
                title: 'Employer List',
                employers: JSON.parse(employers)
            });
        }
    });  
});

/* GET /create - display form to add an employer */
router.get('/create', (req, res) => {
    res.render('employers/create');
});

/* POST /create - submit form data to mongodb */
router.post('/create', (req, res) => {
    Employer.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/employers');
        }
    });
});

// make public
module.exports = router;