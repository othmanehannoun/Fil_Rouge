import React from 'react'
import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Button from '../button/Button'
import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';

  import { Colors } from '../Component/Style';
  const {primary} = Colors 

function OnBoardScreen ({navigation}){
    

    let [fontsLoaded] = useFonts({
      Inter_200ExtraLight,
      'BreeSerif-Regular': require('../../assets/fonts/BreeSerif-Regular.ttf')
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }
    
        return (
            <View style={styles.container}>
                 <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/logo1.png')}
                    resizeMode="contain"
                />

                <Text style={{fontSize:25, margin:20, fontFamily:'BreeSerif-Regular'}}> Carnet de Crédit</Text>
                <Text style={{fontSize:16, color:"gray", textAlign:'center', marginHorizontal:20, fontFamily:'BreeSerif-Regular'}}>
                    La meilleure application de livre de compte digital et 100% gratuite
                </Text>
                

                <View style={{margin:40, 
                              paddingVertical:20, 
                              width: Dimensions.get('window').width * 0.6}}>
                {/* <TouchableOpacity 
                onPress={() => navigation.navigate('TypeUser')}
                
                style={{
                  // #018136
                    position: 'absolute',
                    backgroundColor: primary,
                    padding:10,
                    width: Dimensions.get('window').width * 0.65,
                    height: 55,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 90,
                    marginLeft: Dimensions.get('window').width/100*-32,
                    
                }}
                >
                    <Text style={{textAlign:'center', color:"#fff", fontSize:20, fontFamily:'BreeSerif-Regular'}}>Get Started</Text>
                </TouchableOpacity> */}

                <Button onPressFunction = {() => navigation.navigate('TypeUser')}
                // PhoneNumber
                title = 'Get Started'/>
                
                </View>


            </View>
        )
    
}

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:"#F5FDFF",
        alignItems: 'center',
        justifyContent: 'center',
      },
      tinyLogo: {
        width: Dimensions.get('window').width * 0.65,
        height: Dimensions.get('window').width * 0.7,
  },
  
});

export default OnBoardScreen
