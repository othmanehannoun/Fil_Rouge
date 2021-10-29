import React, {useState, useRef} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native'
import Button from '../../button/Button';
import Header from '../../Component/Header'
import firebase from '../../../firebase/config';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


import Feather from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';

import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { Colors } from '../../Component/Style';
import config from '../../../config';

const {apiUrl} = config;
const {primary, body, button} = Colors

import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';



export default function PhoneNumber ({route, navigation}){
    const data = route.params;
    const infos = data.infos
    const phoneNbr = data.infos.phone

    const [phoneNumber, setPhoneNumber] = useState(phoneNbr);
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
   

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
          .then(setVerificationId);
      };


    const VerifyNumber = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
          );
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
              // Do something with the results here
              console.log(result);

              const url = apiUrl + '/Epicier/Register'
                axios.post(url, infos).then(response=>{
                    const result = response.data
                    const {msg} = result
                    if(msg !== 'You have register in successfully'){
                    console.log(msg);
                    
                    }else{
                    alert('Successfly')
                    navigation.navigate('LoginEp')
                    }
                    
                })
                .catch(error=>{
                    
                    console.log(error);
                })
            })
            .catch((err)=>{
                alert(err)
            })
        
    }

    let [fontsLoaded] = useFonts({
      Inter_200ExtraLight,
      'BreeSerif-Regular': require('../../../assets/fonts//BreeSerif-Regular.ttf')
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }

        return (
            <KeyboardAvoidingView>
              <ScrollView>
              
                <View style={styles.container}>

                <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
                />
                 <Header text="Verifier" 
                //  source = {require('../../../assets/verify2.png')}
        
                 />
                 <View style={styles.inputContainer}>
                   
              <View>
                <Feather name="phone" size={24} color="black" style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    autoCompleteType="tel"
                    value= {phoneNumber} 
                    placeholderTextColor="#84817a"
                    editable={false} 
                   
                />

                <View style={{marginBottom:30, alignItems:'center',    borderBottomColor: '#dddddd',
        borderBottomWidth: 1,}}>
                   
                     <Text style={{
                        fontSize:15, fontFamily: "BreeSerif-Regular", textAlign:'center', color:'#bdc3c7'
                     }}>Nous vous enverrons un code de vérification à votre numéro de téléphone </Text>

                    <TouchableOpacity onPress={sendVerification} >
                        <View style={styles.categorySelectWrapper}>
                        <Feather
                            name="chevron-right"
                            size={30}
                            style={styles.categorySelectIcon}
                            color="#FFFF"
                        />
                        </View>
                   </TouchableOpacity>

                </View>

              </View>
       
               <View>
               <MaterialIcons name="verified" size={24} color="black" style={styles.iconInput}/>
                 <TextInput
                    style={styles.input}
                    onChangeText={text => setCode(text)}
                    value={code}
                    placeholder="confimation Code"
                    placeholderTextColor="#84817a"
                
                />
                  <Button onPressFunction={VerifyNumber}
                     title="Verifier"
                />
               </View>
         
                    
             </View>
            </View>

            </ScrollView>
            </KeyboardAvoidingView>
        )
    
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: body,
        flex: 1,
        padding:20
    },
    inputContainer:{ 
        padding: 20,
        paddingVertical: Dimensions.get('window').width * 0.1,
        backgroundColor: "#fff",
        // height :Dimensions.get('window').width * 1,
        marginTop: Dimensions.get('window').width * -0.25,
        borderRadius: 30,
        justifyContent: 'center',
        shadowColor: "#000",  
        elevation: 10,  
    },

    input: {
        backgroundColor: '#f5f6fa',
        marginVertical: 10,
        paddingHorizontal: 50,
        color: "#4b4b4b",
        fontWeight: 'bold',
        height: Dimensions.get('window').width * 0.13,
        borderRadius: 10,
        shadowColor: "rgba(200, 200, 200, 0.35)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(171, 180, 189, 0.65)",
      },
      iconInput:{
        position:'absolute',
        color:'#84817a',
        fontSize:22,
        top:Dimensions.get('window').width*0.06,
        left:15,
        zIndex:1
    },
    btnConnection: {
      backgroundColor:"#FFF",
      padding:10,
      height: 55,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Dimensions.get('window').width * 0.02,
  },
    categorySelectWrapper: {
        backgroundColor: primary,
        alignItems : 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: 20,
    },
    textError :{
      position: 'absolute',
      color: 'red',
      marginLeft: '95%',
      marginTop: '7%'
    }
  });
   
   
