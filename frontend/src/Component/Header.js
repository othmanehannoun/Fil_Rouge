import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Colors } from './Style';
const {primary} = Colors

import AppLoading from 'expo-app-loading';

import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';

export default function Header(props) {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    'BreeSerif-Regular': require('../../assets/fonts/BreeSerif-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return(
    <View>
      
    <TouchableHighlight
                style = {{
                  borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                  width: Dimensions.get('window').width * 1.5,
                  height: Dimensions.get('window').width * 1.5,
                  marginTop: Dimensions.get('window').width * -0.98,
                  marginLeft: Dimensions.get('window').width * -0.5,
                  marginBottom: Dimensions.get('window').width * 0.1,
                  backgroundColor: primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}
                underlayColor = '#ccc'
              >
                   <Text style={styles.titre}> {props.text} </Text>
                   
                </TouchableHighlight>
                <Image
                    style={styles.tinyLogo}
                    source={props.source}
                    
                    />
            </View>

  )

}


const styles = StyleSheet.create({
 
  titre:{
    color: "#FFF",
    marginTop: Dimensions.get('window').width * 1,
    marginLeft: Dimensions.get('window').width * 0.4,
    fontSize: Dimensions.get('window').width *0.06,
    fontFamily: "BreeSerif-Regular",  
  },

  tinyLogo: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    marginLeft: Dimensions.get('window').width * 0.21,
    marginTop: Dimensions.get('window').width * -0.1,

},
 
});