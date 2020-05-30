import React,{useEffect,useState} from 'react'
import {View,
    Text,
    StyleSheet,
    AsyncStorage,
    Dimensions
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import FavMeal from '../components/FavMeal'
import {useSelector} from 'react-redux'
export default function FavoritesScreen(props) {
    
    const ids = useSelector(state=>state.meals)
    useEffect(()=>{
        AsyncStorage.getItem('Favorites',(err,result)=>{
            console.log(result)
           // setIds(JSON.parse(result))
        })
       
    },[])
    console.log(ids)
    const renderMeal=(itemData)=>{
        const item = itemData.item
        const navigation = props.navigation
        return(
           
            <FavMeal navigation={navigation} id={item}/>
        )
    }
    return (
        <View style={styles.container}>
        {ids.length>=1?  <Text style={styles.title}>Your Favorites</Text>:null}
          
            {ids.length>=1?
                <Carousel 
            data={ids}
            renderItem={renderMeal}
            layout={'stack'}
            layoutCardOffset={18}
            itemWidth={Dimensions.get('screen').width+1}
            sliderWidth={Dimensions.get('screen').width}
           
            sliderHeight={200}
            slideStyle={{flex:4,height:300,padding:10}}
          />:
          <Text style={styles.title}>No Meals to Display</Text>
            }
            
            </View>
       
        
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:24
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20
    }
})
