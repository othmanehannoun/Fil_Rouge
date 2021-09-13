import React, {useEffect} from 'react'
import {StyleSheet, ActivityIndicator, Image, View, Dimensions} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

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
            <View style={styles.acc}>
                <Image
                    style={styles.logo}
                    source={require('./assets/work.png')}
                    resizeMode="contain"
                />
                <ActivityIndicator size='30%' color='#ffff' />
            
           </View>
        )
    
}

const styles = StyleSheet.create({
    acc: {
        flex: 1,
        backgroundColor:"#1B1464",
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
