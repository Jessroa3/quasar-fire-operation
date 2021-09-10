const math = require('mathjs')
var algebra = require('algebra.js');
const satellitesService = require('../services/satellites.service');

/**
 * main function to obtain the coordinates of the emitter
 * @returns x and y coordinates of the emitter. If it cannot be calculated, it returns an error 404
 */
const findCoordinateEmisor = () => {
  try{
    let satellites = satellitesService.getAll()
    let functions = []
    for (var satellite in satellites) {
      let x = satellites[satellite].coordinates[0]
      let y = satellites[satellite].coordinates[1]
      let d = satellites[satellite].distance
      if(x && y && d)
        functions.push(transformedAndSimplify(x,y,d))
    }
    if(functions.length >= 2){
      let solution1 = solvedCuadraticSistem(functions[0],functions[1])
      let solution2 = solvedCuadraticSistem(functions[0],functions[2])
      let coordinate = calculateCoordinates(solution1,solution2)
      return {'x': coordinate[0], 'y': coordinate[1]}
    } else{
      const error = {
        'status':404, 
        'message': 'Could not set coordinates'
      }
      throw new Error(JSON.stringify(error))
    }
  }
  catch(err) {
    console.log(err)
    throw err
  }
}

/**
 * allows to generate the function of the distance between two points, simplifying the equation with the given values ​​of a point and the distance
 * @param {*} x x-axis value of point one
 * @param {*} y y-axis value of point one
 * @param {number} d distance between the two points
 * @returns function to calculate the distance with the variables of point two to be cleared
 */
const transformedAndSimplify = (x,y,d) => {
  try{
    var Expression = algebra.Expression;
    var point1 = new Expression('x').subtract('a').pow(2,false);
    var point2 = new Expression('y').subtract('b').pow(2,false);
    var distance = math.pow(d,2)
    var arg1 =  point1.eval({a: x})
    var arg2 =  point2.eval({b: y})
    const f = algebra.parse('-'+distance.toString()+'+'+arg1.toString()+'+'+arg2.toString())
    return f
  }catch (err){
    throw err
  }
}

/**
 * allows solving the variables of a system of quadratic equations of 2 functions with two variables
 * @param {*} f1 first function of the system of equations to solve
 * @param {*} f2 second function of the system of equations to solve
 * @returns x and y values ​​expressed in pairs values ​​for x and y of the system of equations
 */
const solvedCuadraticSistem = (f1,f2) => {
  try{
    let eq = f1.subtract(f2)
    const solvedSist = algebra.parse(eq +' = '+ 0)
    var xAnswer = solvedSist.solveFor('x');
    var yAnswer = solvedSist.solveFor('y');
    return [xAnswer,yAnswer]
  } catch (err){
    throw err
  }
}

/**
 * allows to solve a system of equations of 2 functions with two variables
 * @param {*} f1 first function of the system of equations to solve
 * @param {*} f2 second function of the system of equations to solve
 * @returns values ​​for x and y of the system of equations
 */

const calculateCoordinates = (f1,f2) => {
  try{
    const xAnswer1 = f1[0]
    const xAnswer2 = f2[0]
    let eq = xAnswer1.subtract(xAnswer2)
    const solvedSist = algebra.parse(eq +' = '+ 0)
    var y = solvedSist.solveFor('y');
    let x = xAnswer1.eval({y: y})
    return [x.toString(),y.toString()]
  } catch (err){
    throw err
  }
}

/**
 * function that allows to obtain the coordinates of the emitter from the distance of a satellite
 * @param {number} distance distance from transmitter to satellite
 * @returns x and y coordinates of the emitter
 */
const GetLocation = (distance) => {
  try{
    let satellites = satellitesService.getAll()
    for (var satellite in satellites) {
      let d = satellites[satellite].distance
      if(d === distance)
      return findCoordinateEmisor()
    }
  } catch (err){
    throw err
  }
}

module.exports = {
  GetLocation,
  findCoordinateEmisor
};