const express = require('express');

// make public auth check function that can be used anywhere
exports.isAuthenticated = (req, res, next) => {
    // if user is logged, call next to allow to continue whatever they were doing
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
};