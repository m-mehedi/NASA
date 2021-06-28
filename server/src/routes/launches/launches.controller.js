const getAllLaunches = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    // for(const value of launches.values())
    // return res.status(200).json( Array.from(launches.values()) );
    return res.status(200).json( getAllLaunches() );
}

module.exports = {
    httpGetAllLaunches,
}