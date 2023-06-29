import Matter from "matter-js";
import Bird from "../Compo/Bird";
import Floor from "../Compo/Floor"
import {Dimensions} from "react-native";
import Obstacle from "../Compo/Obstacle"
import {getPipeSizePosPair} from "../utils/Random";

const windowHeight=Dimensions.get("window").height;
const windowWidth=Dimensions.get("window").width;
export default restart =>{
  let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    engine.gravity.y = 0.4;
 const pipeSizePosA=getPipeSizePosPair();
 const pipeSizePosB=getPipeSizePosPair(windowWidth * 0.9);
 
  return{
  physics: { engine, world },

 Bird: Bird(world, 'green', {x: 50, y: 300 }, { height: 40, width: 40 }),
  ObstacleTop1 : Obstacle(world,"ObstacleTop1", 'red',pipeSizePosA.pipeTop.pos,pipeSizePosA.pipeTop.size),
  ObstacleBottom1:Obstacle(world,"ObstacleBottom1","red",pipeSizePosA.pipeBottom.pos,pipeSizePosA.pipeBottom.size),
ObstacleTop2:Obstacle(world,"ObstacleTop2","red",pipeSizePosB.pipeTop.pos,pipeSizePosB.pipeTop.size),
  ObstacleBottom2:Obstacle(world,"ObstacleBottom2","red",pipeSizePosB.pipeBottom.pos,pipeSizePosB.pipeBottom.size),
 
 Floor: Floor(world, '#db861f', {x: windowWidth/2, y: windowHeight }, { height: 40, width: windowWidth }),
 
  }
}

//matter only calculates position, inorder to see something on each tick let's use renderer