const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'Register'
    });
});

router.get('/login', (req, res) => {
    res.render('auth/login', { 
        title: 'Login'
    });
});

module.exports = router;