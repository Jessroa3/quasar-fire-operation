'use strict';
const satellites = require('../mocks/info_satellites.json');
const fs = require('fs');
var path = require('path');

/**
 * allows to obtain the information of a satellite from its name
 * @param {string} name satellite name
 * @returns json with the registered satellite information
 */
const get = (name) => {
    return satellites[name]
}

/**
 * allows to obtain the information of all the satellites
 * @returns json with the registered satellite information
 */
const getAll = () =>{
    return satellites;
}

/**
 * allows to record the distance and message data of a satellite
 * @param {*} satellite object with distance and message from a satellite
 */

const setDataSatellite = (satellite) => {
  satellites[satellite.name].distance = satellite.distance
  satellites[satellite.name].message = satellite.message
  var json = JSON.stringify(satellites, null, 2);
  var jsonPath = path.join(__dirname,'../mocks/info_satellites.json');
  fs.writeFile(jsonPath, json, function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
}


module.exports = {
    get,
    getAll,
    setDataSatellite
};