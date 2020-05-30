import React from 'react'
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    Dimensions,
    ImageBackground,
    StatusBar,
    FlatList,
    Switch,
    AsyncStorage
    
} from 'react-native'
import {connect} from 'react-redux'
import setFavorites from '../action/favoriteAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constant/Colors'




class MealDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            meal:[],
            ingredients:null,
            measure:[],
            showInstruction:false,
            time:10,
            favorites:[],
            inFav:false
        }
        this.navigation = this.props.navigation
        this.id = this.props.route.params.id
    }
    componentDidMount(){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`)
        .then(res=>res.json())
        .then(data=>this.setState({meal:data.meals[0]},()=>{
            this.getIngredients()
        }))

        AsyncStorage.getItem('Favorites',(err,result)=>{
            
            const favs = JSON.parse(result)
            if(favs.indexOf(this.id)!==-1){
              
                this.setState({inFav:true})
            }else{
                
            }
        })

    }
    addToFav=(mealId)=>{  
             
        AsyncStorage.getItem('Favorites', (err, result) => {
            const id = [mealId];
            var newIds = []
            if (result !== null) {
              
              if(JSON.parse(result.indexOf(mealId))!==-1){
                 //deleting meal is exist
                 newIds = JSON.parse(result)
                 var index = newIds.indexOf(mealId)
                 newIds.splice(index,index+1)
                 
                 AsyncStorage.setItem('Favorites', JSON.stringify(newIds),()=>{
                    this.setState({inFav:false})
                    this.props.setFavorites(newIds)
                    //console.log(`Meal deleted ${mealId} in ${newIds}`)
                });
                
              }else{
                  //adding meal if not exist
                 newIds = JSON.parse(result).concat(id);
                 AsyncStorage.setItem('Favorites', JSON.stringify(newIds),()=>{
                    this.setState({inFav:true})
                    this.props.setFavorites(newIds)
                   // console.log(`Meal added ${mealId} in ${newIds}`)
                });
              }
              
              
            } else {
             //Adding id for first time
              AsyncStorage.setItem('Favorites', JSON.stringify(id),()=>{
                this.setState({inFav:true})
                this.props.setFavorites(id)
              });
              
            }
          });
    }
     getIngredients=()=>{
        var meal = this.state.meal
        const ing = []
        for (var key of Object.keys(meal)) {
            if(key.indexOf('Ingredient')!==-1){
                if(meal[key]!==""){
                    ing.push(meal[key])
                }
            }
        }

        this.setState({
            ingredients:ing,
            time:this.state.time + ing.length
        })
        
    }
    renderIngredients=(itemData)=>{
        const index = itemData.index
        const item = itemData.item
        return(
            <View style={styles.ingredient}>
                <Text style={{fontSize:18,fontFamily:'open-sans',marginLeft:30}}>{item}</Text>
            </View>
        )
    }
    render() {
        
        const meal = this.state.meal
        
        if(meal.length===0){
            return(
                <View>
                    <ActivityIndicator size={"large"} color={"black"}/>
                </View>
            )
        }else{
           
            return (
                <SafeAreaView style={styles.container}>
            
                    <StatusBar
                    barStyle="light-content"
                    />
                    <ImageBackground
                    style={styles.header}
                    source={{uri:meal.strMealThumb}}
                    >
                        <TouchableOpacity
                        onPress={()=>{
                            this.navigation.goBack()
                        }}
                        >
                            <MaterialCommunityIcons color='white' size={30}  name="arrow-left"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{
                            this.addToFav(meal.idMeal)
                        }}
                        >
                            <MaterialCommunityIcons color={this.state.inFav?'red':'white'} size={30}  name="star"/>
                        </TouchableOpacity>

                        <View style={styles.floater}>
                            <View style={styles.floaterUpper}>
                                <Text style={{...styles.floaterText,fontWeight:'bold',fontSize:18}}> {meal.strMeal}</Text>
                                <Text style={styles.floaterText}> {meal.strCategory} </Text>
                                <Switch
                                trackColor={{ false: "#767577", true: Colors.primary }}
                                thumbColor={this.state.showInstruction ? Colors.accent : "#f4f3f4"}
                                onValueChange={(value)=>this.setState({showInstruction:value})}
                                value={this.state.showInstruction}
                                />
                               
                            </View>
                            
                            <View style={styles.floaterBottom}>
                                <View style={{flexDirection:'row'}}>
                                    <MaterialCommunityIcons color='#ff4e4e' size={20}  name="map-marker" />
                                    <Text style={styles.floaterBottomText}>
                                    
                                    {meal.strArea} 
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <MaterialCommunityIcons color='#53c2cb' size={20}  name="alarm" />
                                    <Text style={styles.floaterBottomText}>
                                    
                                    {this.state.time}min 
                                    </Text>
                                </View>
                                
                                
                                </View>
                        </View>
                    </ImageBackground>
    
                   {this.state.showInstruction?
                
                    <View style={{flex:1}}>
                        <Text style={styles.title}>Instructions</Text>
                        <ScrollView>
                        <Text style={styles.instruction}>{meal.strInstructions}</Text>
                        </ScrollView>
                    </View>
                    :
                    <View style={{flex:1}}>
                        <Text style={styles.title}>Ingredients</Text>
                        
                        <FlatList
                        keyExtractor={(item,index)=>"key"+item+index}
                        data={this.state.ingredients}
                        renderItem={this.renderIngredients}
                        style={styles.ingredients}
                        />
                    </View>
                
                   }
             
                </SafeAreaView>
            )
        }
        
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    header:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        backgroundColor:Colors.accent,
        resizeMode:'stretch'
    },
    title:{
        fontFamily:'open-sans-bold',
        marginTop:55,
        marginLeft:25,
        marginBottom:5,
        fontSize:20
    },
    img:{
        width:200,
        height:300
    },
    floater:{
        position:'absolute',
        bottom:-50,
        display:'flex',
        justifyContent:'space-around',
        left:30,
        width:Dimensions.get('screen').width-50,
        height:140,
        backgroundColor:Colors.accent,
        borderRadius:10,
        elevation:5,
        overflow:'hidden'
    },
    floaterText:{
        color:"black",
        fontFamily:'open-sans',
        fontSize:15
    },
    floaterUpper:{
        padding:15
    },
    floaterBottom:{
        display:"flex",
        padding:15,
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       backgroundColor:Colors.primary
    },
    floaterBottomText:{
        color:'white'
    },
    ingredient:{
        flex:1,
        padding:6,
    },
    ingredients:{
        flex:9,
        padding:10,
        marginBottom:1
    },
    instruction:{
        fontFamily:'open-sans',
        padding:20,
        fontSize:17
    }
})

  const mapDispatchToProps = dispatch => ({
    setFavorites:(payload)=> dispatch(setFavorites(payload))
  })
export default connect(null,mapDispatchToProps)(MealDetails)

