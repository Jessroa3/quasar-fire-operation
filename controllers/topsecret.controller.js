const locationsController = require('./locations.controller');
const messagesController = require('./messages.controller');
const satellitesService = require('../services/satellites.service');


const topSecret = async function(req, res){
  try{
    let dataInputSatellites = req.body.satellites
    for(let dataInputSatellite of dataInputSatellites){
      satellitesService.setDataSatellite(dataInputSatellite)
    }
    let message = messagesController.DecryptMessage()
    let emisor = {}
    emisor.position = locationsController.findCoordinateEmisor()
    emisor.message = messagesController.GetMessage(message)
    res.send(emisor)
  }catch (err){
    console.log(err)
    res.status(400).send(err.stack)
  }
      
}

module.exports = {
    topSecret
};