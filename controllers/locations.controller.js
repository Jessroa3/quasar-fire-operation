var _ = require('lodash-contrib'); 
const math = require('mathjs')
var algebra = require('algebra.js');
const satellitesService = require('../services/satellites.service');

const findCoordinateEmisor = function(){
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
      return {"x": coordinate[0], "y": coordinate[1]}
    } else{
      return 404
    }
  }
  catch(err) {
    console.log(err)
    res.status(400).send(err.stack)
  }
}

function transformedAndSimplify (x,y,d){
  var Expression = algebra.Expression;
  var point1 = new Expression("x").subtract("a").pow(2,false);
  var point2 = new Expression("y").subtract("b").pow(2,false);
  var distance = math.pow(d,2)
  var arg1 =  point1.eval({a: x})
  var arg2 =  point2.eval({b: y})
  const f = algebra.parse('-'+distance.toString()+'+'+arg1.toString()+'+'+arg2.toString())
  return f
}

function solvedCuadraticSistem(f1,f2){
  let eq = f1.subtract(f2)
  const solvedSist = algebra.parse(eq +' = '+ 0)
  var xAnswer = solvedSist.solveFor("x");
  var yAnswer = solvedSist.solveFor("y");

  let x = solvedSist.eval({x: xAnswer})
  return [xAnswer,yAnswer]
}


function calculateCoordinates(f1,f2){
  const xAnswer1 = f1[0]
  const xAnswer2 = f2[0]
  let eq = xAnswer1.subtract(xAnswer2)
  const solvedSist = algebra.parse(eq +' = '+ 0)
  var y = solvedSist.solveFor("y");
  let x = xAnswer1.eval({y: y})
  return [x.toString(),y.toString()]
}

const GetLocation = function (distance){
    if(!_.isNumeric(distance)){
        return 404
    }
    let satellites = satellitesService.getAll()
    for (var satellite in satellites) {
      let d = satellites[satellite].distance
      if(d === distance)
      return findCoordinateEmisor()
    }
    return 404

}


module.exports = {
  GetLocation,
  findCoordinateEmisor
};