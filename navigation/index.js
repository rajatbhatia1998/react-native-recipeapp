import React from 'react'
import Colors from '../constant/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from '../screen/CategoriesScreen'
import FavoritesScreen from '../screen/FavoritesScreen'
import CategoriesMeals from '../screen/CategoriesMeals'
import MealDetails from '../screen/MealDetails'

const HomeScreenNavigator=()=>{
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator
        screenOptions={{
           // headerShown:false
           headerStyle:{backgroundColor:Colors.accent},
           headerTintColor:Colors.primary,
        }}
        >
                 <Stack.Screen name="Categories" component={CategoriesScreen}  />
                 <Stack.Screen name="Meals" component={CategoriesMeals} />
                 <Stack.Screen name="Meal Details" component={MealDetails}
                 options={{ headerShown: false }}
                 />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    
    const Tab = createMaterialBottomTabNavigator();

    return (
        <NavigationContainer>

            <Tab.Navigator
            initialRouteName="Home"
            activeColor={Colors.primary}
            inactiveColor={Colors.secondary}
            barStyle={{ backgroundColor: Colors.accent }}
            >
                <Tab.Screen name="Home" 
                component={HomeScreenNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                  }}
                
                />
                <Tab.Screen name="Favorites" 
                component={FavoritesScreen} 
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="cards-heart" color={color} size={26} />
                    ),
                  }}/>
            </Tab.Navigator>
      </NavigationContainer>
    )
}
