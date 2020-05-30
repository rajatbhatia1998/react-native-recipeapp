import React from 'react'
import {Dimensions,Image,View,TouchableHighlight,Text,StyleSheet} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import topMeals from '../constant/topMeals.json'

export default function TopMeals(props) {
    const renderTopMeal=(itemData)=>{
        const item = itemData.item
        const navigation = props.navigation
        return(
            <TouchableHighlight
            style={styles.card}
            activeOpacity={0.9}
            underlayColor="#e5e5e5"
            onPress={()=>{
                navigation.navigate('Meal Details',{
                    id:item.idMeal
                })
            }}
            >
                <View>
                    <Image source={{uri:item.strMealThumb}}
                    style={{
                    width:(Dimensions.get('screen').width /2)-20,
                    height:130,
                    resizeMode:'stretch'}}
                    />
                    
                    <Text style={styles.text}>{item.strMeal}</Text>
                </View>
            </TouchableHighlight>
            
        )
    }
    return (
        <Carousel
        data={topMeals}
        renderItem={renderTopMeal}
        layout={'default'}
        itemWidth={Dimensions.get('screen').width/2}
        sliderWidth={Dimensions.get('screen').width}
       
        slideStyle={{height:300}}
      />
    )
}
const styles = StyleSheet.create({
    card:{
        flex:1,
        backgroundColor:"white",
        elevation:1,
        flexDirection:'column',
        marginHorizontal:10
    },
    text:{
        fontFamily:'open-sans',
        fontSize:20,
        margin:10
    }
})
