const express = require('express');
const {
    HttpGetAllPlanets
} = require('./planets.controller');
const planetsRouter = express.Router();

planetsRouter.get('/planets', HttpGetAllPlanets);

module.exports = planetsRouter;
