const locationsController = require('./locations.controller');
const messagesController = require('./messages.controller');
const satellitesService = require('../services/satellites.service');


const topSecret = function(req, res){
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
    let errorResponse = handleError(err)
    res.status(errorResponse.statusCode).send(errorResponse.errorMessage)
  }
      
}


const topSecretBySatellite = function(req, res){
  try{
    let satelliteName = req.params.satellite_name
    if(!satellitesService.get(satelliteName))
      throw new Error('Not found satellite ' + satelliteName)
    let dataInputSatellite = req.body
    dataInputSatellite.name = satelliteName
    validateFormatAndDataInput(dataInputSatellite)
    satellitesService.setDataSatellite(dataInputSatellite)
    let message = messagesController.DecryptMessage()
    let emisor = {}
    emisor.position = locationsController.findCoordinateEmisor()
    emisor.message = messagesController.GetMessage(message)
    emisor.position = locationsController.GetLocation(dataInputSatellite.distance)
    res.send(emisor)
  }catch (err){
    let errorResponse = handleError(err)
    res.status(errorResponse.statusCode).send(errorResponse.errorMessage)
  }
}

const getTopSecretBySatellite = function(req, res){
  try{
    let satelliteName = req.params.satellite_name
    if(!satellitesService.get(satelliteName))
      throw new Error('Not found satellite ' + satelliteName)
    let emisor = {}
    let message = messagesController.DecryptMessage()
    emisor.position = locationsController.findCoordinateEmisor()
    emisor.message = messagesController.GetMessage(message)
    res.send(emisor)
  }catch (err){
    let errorResponse = handleError(err)
    res.status(errorResponse.statusCode).send(errorResponse.errorMessage)
    
  }
}

const validateFormatAndDataInput = function(satellite){
  let satelliteName = satellite.name
  if(!satellite.name || !satellite.distance || !satellite.message){
    throw new Error('Missing info')
  }
  if((typeof satellite.name !== 'string') || (typeof satellite.distance !== 'number') || (!Array.isArray(satellite.message))){
    throw new Error('Not valid format')
  }
  if(!satellitesService.get(satelliteName))
    throw new Error('Not found satellite ' + satelliteName)
  return true

}

const handleError = function(err){
  console.log("err")
  console.log(err)
  let errorResponse = {
    'statusCode': 400,
    'errorMessage': err.message
  }
  if(typeof err.message === 'object'){
    const message = JSON.parse(err.message)
    errorResponse.statusCode = message.status
    errorResponse.errorMessage = message.message
  }
  return errorResponse
}

module.exports = {
    topSecret,
    topSecretBySatellite,
    getTopSecretBySatellite
};