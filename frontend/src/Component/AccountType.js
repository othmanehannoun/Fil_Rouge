import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import Feather from 'react-native-vector-icons/Feather';

import { Colors } from '../Component/Style';
const {primary, button} = Colors

import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';

export default function AccountType(props) {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    'StintUltraCondensed-Regular': require('../../assets/fonts/StintUltraCondensed-Regular.ttf'),
    'BreeSerif-Regular': require('../../assets/fonts/BreeSerif-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return(
  
          

           <TouchableOpacity style={styles.categoryItemWrapper}
             onPress={props.onPressFunction}
             >
                  <Text style={styles.categoryItemTitle}>{props.title}</Text>

                <View style={styles.categorySelectWrapper}>
                  <Feather
                    name="chevron-right"
                    size={30}
                    style={styles.categorySelectIcon}
                    color="#FFFF"
                  />
                </View>
             </TouchableOpacity>
             
          

  )
}




const styles = StyleSheet.create({

  categoryItemWrapper: {
    width : '100%',
    backgroundColor: '#FFFF',
    flexDirection: "row",
    height: '18%',
    justifyContent: 'space-between',
    padding: Dimensions.get('window').width * 0.05,
    alignItems: "center",
    marginBottom:20,
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
    fontSize: Dimensions.get('window').width * 0.07,
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
 
});