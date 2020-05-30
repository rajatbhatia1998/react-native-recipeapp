import React,{useEffect,useState} from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import Navigation from './navigation/index.js'
import SplashScreen from './screen/SplashScreen'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import favoriteReducer from './reducer/favoriteReducer'


const loadFont= async()=>{
 await Font.loadAsync({
  "open-sans":require('./assets/fonts/OpenSans-Regular.ttf'),
  "open-sans-bold":require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
  const [showSplash,setShowSplash] = useState(true)
  const store = createStore(
    favoriteReducer,
 
    )
  useEffect(()=>{
    loadFont();
    setTimeout(()=>{
      setShowSplash(false)
    },3000)
  },[])
  console.log(store.getState())
  return (
    <Provider store={store}>
      <View style={styles.container}>
      {showSplash?
        <SplashScreen/>
        :
        <Navigation/>}
        
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});
