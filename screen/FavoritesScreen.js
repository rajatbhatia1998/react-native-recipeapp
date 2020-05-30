import React,{useEffect,useState} from 'react'
import {View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import Carousel from 'react-native-snap-carousel'


export default function FavoritesScreen(props) {
    useEffect(()=>{
        AsyncStorage.getItem('Favorites',(err,result)=>{
            console.log(result)
        })
    },[])
    const renderMeal=(itemData)=>{
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
        <View style={styles.container}>
            <Text style={styles.title}>Your Favorites</Text>
            <Carousel
            data={topMeals}
            renderItem={renderMeal}
            layout={'default'}
            itemWidth={Dimensions.get('screen').width/2}
            sliderWidth={Dimensions.get('screen').width}
           
            slideStyle={{height:300}}
          />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20
    },
    card:{
        flex:1,
        backgroundColor:"white",
        elevation:5,
        flexDirection:'column',
        marginHorizontal:10
    },
})
