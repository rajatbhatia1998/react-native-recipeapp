import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,FlatList,ImageBackground} from 'react-native'
import Colors from '../constant/Colors'
import { Constants } from 'expo'
import { SearchBar } from 'react-native-elements';


export default function CategoriesScreen(props) {

    const [categories,setCategories] = useState([])
    const [search,setSearch] = useState("")
    const [cat,setCat] = useState([])
    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res=>res.json())
        .then(data=>{
            setCat(data.categories)
            setCategories(data.categories)})
        .catch(err=>console.log(err))
    },[])

    const renderCategory=(itemData)=>{
        return(
            <TouchableOpacity style={styles.category}
            onPress={()=>
                props.navigation.navigate('Meals',{
                name:itemData.item.strCategory
            })}
            >
           
                <ImageBackground
                style={styles.image}
                source={{ uri: itemData.item.strCategoryThumb}}
                />
                    <View style={styles.overlay}></View>
                    <Text style={styles.text}>{itemData.item.strCategory}</Text>
            </TouchableOpacity>
        )
        }
  const updateSearch=(text)=>{
      
      var updatedList = cat
       updatedList = updatedList.filter(function(item){
        return item.strCategory.toLowerCase().search(
          text.toLowerCase()) !== -1;
      });
      setCategories(updatedList)
      setSearch(text)
     
  }
   
    
    return (
        <View style={styles.container}>
        <SearchBar
        lightTheme={true}
        round={true}
        platform="android"
        placeholder="Search Category..."
        onChangeText={updateSearch}
        value={search}
        />
        {categories.length>0?
            <FlatList
             style={{marginVertical:10}}
            keyExtractor={(item,index)=>item.idCategory}
            data={categories}
            renderItem={(itemData)=>renderCategory(itemData)}
            numColumns={2}
            />:
            null
        }
        </View>
    )
}




const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    category:{
        flex:1,
        margin:4,
        padding:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor: Colors.accent,
        
    },
    image:{
        flex:1,
        width:180,
        overflow:'hidden',
        height:80,
        resizeMode:'cover',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:14,
        overflow:'hidden',
        color:'white',
        fontFamily:'open-sans-bold',
        position:'absolute'
    },
    overlay:{
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius:20,
    },
  
})
