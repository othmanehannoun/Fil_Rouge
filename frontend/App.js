
import * as React from 'react';
import {ActivityIndicator,Text, StyleSheet, View, Image, Dimensions} from 'react-native'


import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import TypeUser from './src/screen/TypeUser';
import OnBoardScreen from './src/screen/OnBoardScreen';
import Lodding from './src/Component/Lodding'


import Login from './src/screen/Epicier/Login';
import Register from './src/screen/Epicier/Register';
import Dashbaord from './src/screen/Epicier/Dashboard';
import AddClient from './src/screen/Epicier/AddClient';
import Profile from "./src/screen/Epicier/profile";
import Details from './src/screen/Epicier/Details';
import Update from './src/screen/Epicier/Update'
import CartVisite from './src/screen/Epicier/CartVisite';
import Reminder from './src/screen/Epicier/Reminder';
//import MainTabScreen from './src/screen/MainTabScreen';

import LoginCnt from './src/screen/Clinet/LoginCnt';
// import Register from './src/screen/Epicier/Register';
import DashboardCnt from './src/screen/Clinet/Dashboard';
import DetailsCnt from './src/screen/Clinet/DetailsCnt';
import UserProfil from './src/screen/Clinet/UserProfil'
import UserUpdate from './src/screen/Clinet/UserUpdate'

// import { Colors } from './src/Component/Style';
//   const {primary} = Colors 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const App = () => {


  
  const TabNavEp =() =>{

    return(

             <Tab.Navigator>
                     <Tab.Screen name="Home" 
                     component={Dashbaord}
                     options={{
                       tabBarIcon: () => (
                         <AntDesign name="home" size={24} color="black" />
                       ),
                     }} />
                     <Tab.Screen name="Client" 
                     component={AddClient} 
                     options={{
                       tabBarIcon: () => (
                         <AntDesign name="plus" size={24} color="black" />
                       ),
                     }}/>
                     <Tab.Screen name="Profil" 
                     component={Profile}
                     options={{
                       tabBarIcon: () => (
                         <AntDesign name="user" size={24} color="black" />
                       ),
                     }} />
                      
                   </Tab.Navigator>
              
              
       )
   
}

        // Tab Nav User 
        const TabNavUser =() =>{

          return(

                  <Tab.Navigator>
                     <Tab.Screen name="Home" 
                     component={DashboardCnt}
                     options={{
                       tabBarIcon: () => (
                         <AntDesign name="home" size={24} color="black" />
                       ),
                     }} />
                     
                     <Tab.Screen name="Profil" 
                     component={UserProfil}
                     options={{
                       tabBarIcon: () => (
                         <AntDesign name="user" size={24} color="black" />
                       ),
                     }} />
                      
                   </Tab.Navigator>
              
              
       )
   
}
  // const [loading, setLoading] = React.useState(true)

  // React.useEffect(() => {
  //   setTimeout(() => setLoading(false), 6000)
  // }, [])

  return (
    
        <>
       
              <NavigationContainer>
              <Stack.Navigator>
                {/* GENERALE */}
                <Stack.Screen name="Lodding" component={Lodding} options={{headerShown: false}} />
                <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} options={{headerShown: false}} />
                <Stack.Screen name="TypeUser" component={TypeUser} options={{ title: 'Welcome', headerTitleStyle: {fontWeight: 'bold'} }} />
                
                {/* ROUTER EPICIER */}
                <Stack.Screen name="RegisterEp" component={Register} options={{ title: 'Register', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="LoginEp" component={Login} options={{ title: 'Login', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="Dashboard" component={TabNavEp} options={{ title: 'Dashboard', headerTitleStyle: {fontWeight: 'bold'}}} />
                <Stack.Screen name="Details" component={Details} options={{ title: 'Details', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="Update" component={Update} options={{ title: 'Update', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="CartVisite" component={CartVisite} options={{ title: 'Carte Visite', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="Reminder" component={Reminder} options={{ title: 'Reminder', headerTitleStyle: {fontWeight: 'bold'} }} />

                {/* ROUTER CLIENT */}
                {/* <Stack.Screen name="RegisterCnt" component={Register} options={{ title: 'Register', headerTitleStyle: {fontWeight: 'bold'} }} /> */}
                <Stack.Screen name="LoginCnt" component={LoginCnt} options={{ title: 'Login', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="DashboardCnt" component={TabNavUser} options={{ title: 'Dashboard', headerTitleStyle: {fontWeight: 'bold'}}} />
                <Stack.Screen name="DetailsCnt" component={DetailsCnt} options={{ title: 'Details', headerTitleStyle: {fontWeight: 'bold'} }} />
                <Stack.Screen name="UserUpdate" component={UserUpdate} options={{ title: 'Update infos', headerTitleStyle: {fontWeight: 'bold'} }} />


              
              </Stack.Navigator>
    
              {/* <Drawer.Navigator >
                <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
              </Drawer.Navigator> */}
            </NavigationContainer>
         
          
          </>

        

  );
};

const styles = StyleSheet.create({
  // acc: {
  //  flex: 1,
  //  backgroundColor:"#1B1464",
  //  alignItems: 'center',
  //  justifyContent: 'center',
   
  // },
  // logo:{
  //     marginBottom: Dimensions.get('window').width*-0.45,
  //     width: Dimensions.get('window').width * 0.2,
  //     height: Dimensions.get('window').width * 0.7,
  // }
 
 
});

export default App


 