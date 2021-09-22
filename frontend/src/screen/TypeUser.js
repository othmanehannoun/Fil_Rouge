import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Hedear from '../Component/Header';
import AppLoading from 'expo-app-loading';

import AccountType from '../Component/AccountType';

import { Colors } from '../Component/Style';
const {primary, button, body} = Colors

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
        {/* <Image
          style={styles.img}
          source={require('../../assets/logo1.png')}
          resizeMode="contain"
        /> */}
        </View>
          <View>
              <Text style={{
                fontFamily: 'BreeSerif-Regular', 
                fontSize:30,
                marginBottom: Dimensions.get('window').width * 0.05,
                }}
                >
                  Choose from 2 types of accounts:
              </Text>
          </View>
          <AccountType 
            title = "Business Account"
            onPressFunction={() => navigation.navigate('LoginEp')}
            />

          <AccountType 
            title = "Personal Account"
            onPressFunction={() => navigation.navigate('LoginCnt')}
            />

      </View>

  )
}




const styles = StyleSheet.create({
  container: {
   backgroundColor: body,
   flex: 1,
   padding:20
  },
  categoryItemWrapper: {
    backgroundColor: '#FFFF',
    flexDirection: "row",
    height: '28%',
    justifyContent: 'space-between',
    padding: 40,
    alignItems: "center",
    marginBottom: 20,
    marginRight: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  categoryItemTitle: {
    color: primary,
    fontFamily: 'BreeSerif-Regular',
    fontSize: 30,
   
  },
  categorySelectWrapper: {
    backgroundColor: button,
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 40,
    height: 40,
    borderRadius: 50,
    marginBottom: 20,
  },
  categorySelectIcon: {

    
  },
  // img:{
  //   position:'absolute',
  //   width: Dimensions.get('window').width*1,
  //   height: Dimensions.get('window').width*1.5,
  //   top:  Dimensions.get('window').width* -0.73,
  //   left:  Dimensions.get('window').width*0.55,
  // }
 
});