'use strict';
const satellites = require('../mocks/info_satellites.json');
const fs = require('fs');
var path = require('path');


const get = function(name){
    return satellites[name]
}

const getAll = function(){
    return satellites;
}

const setDataSatellite = function(satellite){
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