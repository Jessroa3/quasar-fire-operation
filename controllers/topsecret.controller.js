const locationsController = require('./locations.controller');
const messagesController = require('./messages.controller');
const satellitesService = require('../services/satellites.service');

/**
 * controller to obtain the coordinates and message from the transmitter with input of distance data and message sent to a group of satellites
 * @param {*} req 
 * @param {*} res 
 */
const decryptMessageAndCoordinatesBySatelliteGroup = (req, res) => {
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
/**
 * controller to get the coordinates and message from the transmitter with input of distance data and message sent to a satellite
 * @param {*} req 
 * @param {*} res 
 */

const decryptMessageAndCoordinatesBySatellite = (req, res) => {
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

/**
 * controller to obtain the coordinates and message of the sender by consulting a satellite
 * @param {*} req 
 * @param {*} res 
 */

const getTopSecretBySatellite = (req, res) =>{
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

/**
 * allows validating that the input data comply with the established format
 * @param {*} satellite object with satellite data
 * @returns error if the fields are not valid
 */
 const validateFormatAndDataInput = (satellite) => {
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

/**
 * lets handle errors
 * @param {*} err 
 * @returns 
 */
 const handleError = (err) => {
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
    decryptMessageAndCoordinatesBySatelliteGroup,
    decryptMessageAndCoordinatesBySatellite,
    getTopSecretBySatellite
};