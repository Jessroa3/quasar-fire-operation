
const satellitesService = require('../services/satellites.service');

/**
 * allows decrypting the message sent by the sender to the satellites, 
 * complementing the missing phrases on one satellite with the message sent to another
 * @returns array with decrypted message
 */
const DecryptMessage = () =>{
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

/**
 * allows to obtain the message sent from the sender to the decrypted satellites
 * @param {[]} messages sender message in string array
 * @returns message from the decrypted sender if it cannot be decrypted returns error 404
 */
const GetMessage = (messages) =>{
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