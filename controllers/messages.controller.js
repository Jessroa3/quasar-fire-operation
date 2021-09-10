
const satellitesService = require('../services/satellites.service');

const DecryptMessage = function(){
  try{
    let satellites = satellitesService.getAll()
    let messages = []
    for (var satellite in satellites) {
      messages.push(satellites[satellite].message)
    }
    const result = messages[0].map((element, index) => {
      if(element === ''){
        return messages[1][index] !== '' ? messages[1][index] : messages[2][index]
      }
      return element
    });
    return result
  } catch (err){
    throw err
  }
}

const GetMessage = function(messages){
  try{
    if(messages.some((element) => { return element === '' || element === undefined})){
      const error = {
        'status':404, 
        'message': 'The message cannot be decrypted'
      }
      throw new Error(JSON.stringify(error))
    } else {
      return messages.join(' ')
    }
  } catch (err){
    throw err
  }
}

module.exports = {
  DecryptMessage,
  GetMessage
};