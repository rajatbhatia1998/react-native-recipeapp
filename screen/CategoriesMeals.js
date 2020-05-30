import React,{useEffect,useState} from 'react'
import {View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import TopMeals from '../components/TopMeals'
import Colors from '../constant/Colors'




const CategoriesMeals=(props) =>{
    const name = props.route.params.name
    const navigation = props.navigation
    const [meals,setMeals] = useState([])
    const [featured,setFeatured] = useState([])
    useEffect(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then(res=>res.json())
        .then(data=>setMeals(data.meals))
    },[])

    const renderMeal=(itemData)=>{
        const item = itemData.item
        return(
            <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="#e5e5e5"
            style={styles.card}
            onPress={()=>{
                navigation.navigate('Meal Details',{
                    id:item.idMeal
                })
            }}
            >
                <View>
                    <Image source={{uri:item.strMealThumb}}
                    style={{
                    width:Dimensions.get('screen').width-20,
                    height:200,
                    resizeMode:'cover'}}
                    />
                  
                        <Text style={styles.text}>{item.strMeal}</Text>
                       
                        
                   
                </View>
            </TouchableHighlight>
            
        )
    }
    if(meals.length===0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }
    return (
        
        <View style={styles.container}>

            <Text style={styles.header}>TOP MEALS</Text>
        
            <TopMeals navigation={navigation}/>
           
            <Text style={styles.header}>{name} MEALS</Text>

            <Carousel
              data={meals}
              renderItem={renderMeal}
              layout={'tinder'}
              layoutCardOffset={9}
              itemWidth={Dimensions.get('screen').width+1}
              sliderWidth={Dimensions.get('screen').width}
              sliderHeight={200}
              slideStyle={{flex:4,height:300,padding:1}}
            />
        </View>
       
    )
   
}

    
  



const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:24,
        flexDirection:'column'
    },
    card:{
        flex:1,
        backgroundColor:"white",
        elevation:5,
        flexDirection:'column',
        marginHorizontal:10
    },
    text:{
        fontFamily:'open-sans',
        fontSize:20,
        overflow:'hidden',
        margin:10
    },
    header:{
        fontFamily:'open-sans-bold',
        marginVertical:4,
        marginLeft:10,
        fontSize:18,
        textTransform:'uppercase'
    }
})




export default CategoriesMeals