import React, {useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native'
import Button from '../../button/Button';
import Header from '../../Component/Header'
import * as Yup from 'yup'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Formik } from "formik";
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '../../Component/Style';
const {primary} = Colors
// import { _storeData, _retrieveData} from "../../Component/localStorge";

import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';



export default function Login ({navigation}){
  



  const validationSchema = Yup.object({
     email: Yup.string().email('Invalid email address').required('email is Required '),
     password: Yup.string().min(10, 'Invalid password').required('Required').required('password is Required'),
     })

  const [message, setMessage] = useState();
  
   
    const initialValues = {email: '', password: ''}

    const handleLogin = async(values, setSubmitting) => {
      handleMessage(null);
      console.log(values);

      const url = 'http://10.0.2.2:7000/UserLogin';
      await axios.post(url, values)
        .then((response) => {
          const result = response.data;
          // console.log(result);
          const {msg, user, accesstoken} = result
          if(msg !== 'You have signed in successfully'){
            handleMessage('password or email incorrect');
            
          }else{
            
            // handleMessage(msg);
              
            /*AsyncStorage.setItem('user',user);*/  
            AsyncStorage.setItem('user',JSON.stringify({...user})); 
            AsyncStorage.setItem('Usertoken', accesstoken);
            // console.log(epicier); 
            // npx expo-codemod
            navigation.navigate('DashboardCnt')
          }
          
           setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    };

    const handleMessage = (message) => {
      setMessage(message);
    };
  
   

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
              {/* <StatusBar style="dark" /> */}
                <View style={styles.container}>
                 <Header text="Login" 
                 source = {require('../../../assets/login1.png')}
                 
                 />
                 <View style={styles.inputContainer}>
                   <View style={{marginBottom:30}}>
                     <Text style={{
                        fontSize:30, fontFamily: "BreeSerif-Regular", textAlign:'center' 
                     }}>Welcome back</Text>
                     <Text style={{
                        fontSize:15, fontFamily: "BreeSerif-Regular", textAlign:'center', color:'#bdc3c7'
                     }}>Use your credentials below and login to your account</Text>
                   </View>

                  <Formik
                  initialValues={initialValues}
                  validationSchema = {validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    if (values.email == '' || values.password == '') {
                      handleMessage('Please fill in all fields');
                       setSubmitting(false);
                    } else {
                      handleLogin(values, setSubmitting);
                    }
                  }}
                    
                  >

                {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting  }) => (
              <>
           
                
                
               {
                
                  message && (
                    <View style={{backgroundColor:'red', marginBottom:20, height:50, justifyContent:'center', borderRadius:10}}>
                    <Text style={{textAlign:'center', 
                      fontSize:20, color:'#fff',
                      fontFamily: "BreeSerif-Regular"
                       }}
                      >
                         {message}
                      </Text>
                  </View>
                   )
                
               }
                
                     
                    
            
              <View>
                <Feather name="phone" size={24} color="black" style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    name = 'email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="PHONE NUMBER"
                    placeholderTextColor="#84817a"
                />
                 {errors.email &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                    }
              </View>
       
               <View>
               <Feather name="lock" size={24} color="black" style={styles.iconInput}/>
                 <TextInput
                    style={styles.input}
                    name='password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="PASSWORD"
                    placeholderTextColor="#84817a"
                    secureTextEntry={true}
                />
                 {errors.password &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                    }
               </View>
 
                {
                  !isSubmitting && (
                    <Button onPressFunction={handleSubmit}
                        title="Login"
                    />
                  
                )}

                 {isSubmitting && (
                   <Button disabled={true}
                   title={<ActivityIndicator size="large" color="#fff" />}
                   
                   />
                 
                )}

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('RegisterEp')}
                         style={styles.btnConnection}>
                          <Text
                            style={
                                {
                                    color: primary,
                                    fontSize: 20,
                                    fontFamily: "BreeSerif-Regular"
                                }
                            }
                          >
                            Create New Account!
                        </Text>
                    </TouchableOpacity> 
                
            </>

          )}

             
            </Formik>
                
                    
             </View>
            </View>

            </ScrollView>
            </KeyboardAvoidingView>
        )
    
}


const styles = StyleSheet.create({
    container: {
     backgroundColor:"#F5FDFF",
     height: Dimensions.get('window').width*2,
     flex: 1,
     padding:20
    },
    inputContainer:{
        padding: 20,
        paddingVertical: Dimensions.get('window').width * 0.1,
        backgroundColor: "#fff",
        height: 'auto',
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
        height: Dimensions.get('window').width*0.13,
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

    textError :{
      position: 'absolute',
      color: 'red',
      marginLeft: '95%',
      marginTop: '7%'
    }
  });
   
   
