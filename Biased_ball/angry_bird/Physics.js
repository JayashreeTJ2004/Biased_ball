import Matter from "matter-js"
import {getPipeSizePosPair} from "./utils/Random";
import {Dimensions} from "react-native";

const windowHeight=Dimensions.get("window").height;
const windowWidth=Dimensions.get("window").width;
const Physics=(Entities,{touches,time,dispatch})=>{
  let engine=Entities.physics.engine;
  
  touches.filter(t => t.type === 'press')
        .forEach(t => {
            Matter.Body.setVelocity(Entities.Bird.body, {
                x: 0,
                y: -4
            })
        })
  
  Matter.Engine.update(engine,time.delta);
  for (let index = 1; index <= 2; index++) {
        if(Entities[`ObstacleTop${index}`].body.bounds.max.x<=50 && !Entities[`ObstacleTop${index}`].point){
          Entities[`ObstacleTop${index}`].point=true
          dispatch({type:"new_point"})

        }
        
        if (Entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

            Matter.Body.setPosition(Entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(Entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos)

            Entities[`ObstacleTop${index}`].point = false
        }

        Matter.Body.translate(Entities[`ObstacleTop${index}`].body, { x: -3, y: 0 })
        Matter.Body.translate(Entities[`ObstacleBottom${index}`].body, { x: -3, y: 0 })
    }

       Matter.Events.on(engine,'collisionStart',(event)=>{
         dispatch({type:"game_over"})
       })
       
  
  return Entities;
}
export default Physics;