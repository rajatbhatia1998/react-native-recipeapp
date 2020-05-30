import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import Colors from '../constant/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons name="chef-hat" color={'black'} size={50} />
                <Text style={styles.title}>Cook Book</Text>
            
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    title:{
        color:Colors.primary,
        fontSize:40,
    },
    
})
