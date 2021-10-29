import React, {useState, useRef} from 'react'
import { View, Button, TextInput,TouchableOpacity, Text,  StyleSheet} from 'react-native'
import firebase from '../../../firebase/config';
import axios from 'axios';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import config from '../../../config';
const {apiUrl} = config;

// The e-mail address and/or password you specified are not correct.
export default function PhoneNumber ({route, navigation}) {
    // const data = route.params;
    // const infos = data.infos
    // console.log('WAAAAKHONAAAA', infos);
    // const aa = data.infos.phone
    // console.log('kkkkkkkkk', aa);

    
    const [phoneNumber, setPhoneNumber] = useState('+212616855202');
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

    
   

    return(
        <View style={styles.container}>

            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
            
            <View style={{marginBottom:30}}>
            <TextInput
                    style={{ paddingHorizontal: 20, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
                    placeholder="Phone Number"
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoCompleteType="tel"
                    value= {phoneNumber} 
                />
                

            <TouchableOpacity onPress={sendVerification}>
                <Text>Send Verification</Text>
            </TouchableOpacity>

        </View>

          <View>
          <TextInput
                style={{paddingHorizontal: 20,  height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
                onChangeText={text => setCode(text)}
                value={code}
                placeholder="confifmation Code"
            />

            <Button title="Verify" onPress={()=> VerifyNumber()}/>
          </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      padding: 20,
      backgroundColor: "#FFFF",
    },


})


