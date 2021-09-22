import React, {useEffect} from 'react'
import {StyleSheet, ActivityIndicator, Image, View, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './Style';
const {primary} = Colors

function Lodding ({navigation}){

    const detectLogin= async ()=>{
        const token = await AsyncStorage.getItem('token')
            if(token){
                console.log(token);
                navigation.navigate('Dashboard')
            }else{
                navigation.navigate('OnBoardScreen')
            }
      }
      useEffect(()=>{
       detectLogin()
      },[])
    
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/work.png')}
                    resizeMode="contain"
                />
                <ActivityIndicator size='30%' color='#ffff' />
            
           </View>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        
       },

       logo:{
           marginBottom: Dimensions.get('window').width*-0.45,
           width: Dimensions.get('window').width * 0.2,
           height: Dimensions.get('window').width * 0.7,
       }
      
});

export default Lodding
