import React,{useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import Navigation from './navigation/index.js'
const loadFont= async()=>{
 await Font.loadAsync({
  "open-sans":require('./assets/fonts/OpenSans-Regular.ttf'),
  "open-sans-bold":require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
  useEffect(()=>{
    loadFont();
  },[])
  
  return (
    <View style={styles.container}>
      <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});
