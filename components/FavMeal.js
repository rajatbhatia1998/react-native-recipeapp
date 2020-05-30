import React,{useEffect,useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    Image
} from 'react-native'

export default function FavMeal(props) {
    const [item,setItem] = useState([])
    const navigation = props.navigation
    useEffect(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.id}`)
        .then(res=>res.json())
        .then(data=>setItem(data.meals[0]))
    },[])

    return (
        <TouchableHighlight
        style={styles.card}
        activeOpacity={0.9}
        underlayColor="#e5e5e5"
        onPress={()=>{
            navigation.navigate('Meal Details',{
                id:props.id
            })
        }}
        >
            <View>
                <Image source={{uri:item.strMealThumb}}
                style={{
                    width:Dimensions.get('screen').width-40,
                    height:200,
                    resizeMode:'cover'}}
                />
                
                <Text style={styles.text}>{item.strMeal}</Text>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    text:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        padding:10
    },
    card:{
        flex:1,
        backgroundColor:"white",
        elevation:0,
        flexDirection:'column',
        marginHorizontal:10
    },
})