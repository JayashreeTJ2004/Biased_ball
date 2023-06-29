import  React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,TouchableOpacity ,SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import {StatusBar} from "expo-status-bar"
import {GameEngine} from "react-native-game-engine"
import Entities from "./Entities/index";
import Physics from "./Physics"
export default function App() {
  const [running,setRunning]=useState(false);
  const [gameEngine,setGameEngine]=useState(null);
 const [currentPoints,setCurrentPoints]=useState(0);
  useEffect (()=>{
    setRunning(false)
  },[])
  return (
    <SafeAreaView style={{flex:1,marginTop:10}}>
    <View style={{flex:1}}>
    
      <GameEngine 
      ref={(ref)=>{setGameEngine(ref)}}
      systems={[Physics]}
       entities={Entities()}
       onEvent={(e)=>{
         switch(e.type){
           case "game_over":
           setRunning(false)
           gameEngine.stop()
           break;

           case "new_point":
           setCurrentPoints(currentPoints+1)
           break;
         }
       }}
       running={running}
       style={{
        position:"absolute",
        top:0,
        right:0,
        left:0,
        bottom:0
      }} >
     <Text style={{fontWeight:"bold",textAlign:"center",fontSize:40,}}>{currentPoints}</Text>
      </GameEngine>

      {!running?
      <View style={{flex:1,justifyContent:"center"}}>

<TouchableOpacity style={{backgroundColor:"black",justifyContent:"center",alignItems:"center",marginHorizontal:"30%",padding:"5%"}}
onPress={()=>{
setRunning(true)
gameEngine.swap(Entities())
setCurrentPoints(0)}}>
<Text style={{color:"white",fontWeight:"bold"}}>START</Text>
</TouchableOpacity>
      </View>:null}
     <StatusBar style="auto" hidden ={true} />
    </View>
    </SafeAreaView>
  );
}


