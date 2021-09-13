import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import Hedear from '../Component/Header';
import Button from '../button/Button'
import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';

export default function TypeUser({navigation}) {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    'StintUltraCondensed-Regular': require('../../assets/fonts/StintUltraCondensed-Regular.ttf'),
    'BreeSerif-Regular': require('../../assets/fonts/BreeSerif-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return(
  
  <View  style={styles.container}>
    <Hedear text="Type D'utilisateur"/>

    <View >
    <Image
      style={styles.img}
      source={require('../../assets/logo1.png')}
      resizeMode="contain"
    />
    </View>
    <View>
        <Text style={{
          fontFamily: 'StintUltraCondensed-Regular', 
          fontSize:40,
          marginBottom: Dimensions.get('window').width * 0.2,
          }}
          >
            Choisissez le type d'utilisateur
        </Text>
    </View>

          <View style={{padding:30}}>
              <Button 
                title = "Épicier"
                onPressFunction={() => navigation.navigate('LoginEp')}
              />
              <Button 
                title = "Client"
                onPressFunction={() => navigation.navigate('LoginCnt')}

              />
            </View>
  </View>

  )
}




const styles = StyleSheet.create({
  container: {
   backgroundColor:"#F5FDFF",
   flex: 1,
   padding:20
  },

  img:{
    position:'absolute',
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').width*1.5,
    top:  Dimensions.get('window').width* -0.73,
    left:  Dimensions.get('window').width*0.55,
  }
 
});