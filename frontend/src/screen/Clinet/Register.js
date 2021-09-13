import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator, Dimensions } from 'react-native'
import Button from '../../button/Button';
import Header from '../../Component/Header';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {Formik} from 'formik'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Yup from 'yup'

import { Colors } from '../../Component/Style';
const {primary} = Colors

import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';


export default function Register ({navigation}){

  const validationSchema = Yup.object({
    last_name: Yup.string().min(6, 'length must be at least 6 characters long').required('Last Name is Required'),
    first_name: Yup.string().min(6, 'length must be at least 6 characters long').required('Last Name is Required'),
    email: Yup.string().email('Invalid email address').required('email is Required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Is not in correct format').min(10, 'Invalid phone number').required('Phone Number is Required'),
    password: Yup.string().min(10, 'Invalid password').required('Required').required('password is Required'),
    address: Yup.string().min(6, 'Invalid address : length must be at least 6 characters long ').required('adress is Required'),
  })

    const [message, setMessage] = React.useState();
  
    const initialValues = {last_name : '',first_name : '',email : '',phone : '', password : '', address : ''}

    const HandelRegister =(values, setSubmitting)=>{

      handleMessage(null)
      const url = 'https://carnetbackend.herokuapp.com/Epicier/Register'
      axios.post(url, values).then(response=>{
        const result = response.data
        const {msg} = result
        if(msg !== 'You have register in successfully'){
          handleMessage(msg);
          
        }else{
          alert('Successfly')
          navigation.navigate('LoginEp')
        }
        setSubmitting(false)
      })
      .catch(error=>{
        setSubmitting(false)
        console.log(error);
      })
    }

    const handleMessage = (message)=>{
      setMessage(message)
    }

    let [fontsLoaded] = useFonts({
        Inter_200ExtraLight,
        'BreeSerif-Regular': require('../../../assets/fonts/BreeSerif-Regular.ttf')
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      }
    
        return (
            <KeyboardAvoidingView>

            <ScrollView>
            <View style={styles.container}>
                
                <Header 
                text = "Register"
                source = {require('../../../assets/register1.png')}
                />

              <View style={styles.inputContainer}>

              <Formik
              initialValues = {initialValues}
              validationSchema = {validationSchema}
              onSubmit={(values , { setSubmitting }) =>{
                if(values.last_name=='' || values.first_name == '',values.email=='' ||values.phone=='' ||values.address=='' ||values.password==''){
                  handleMessage('Please fill in all fields')
                  setSubmitting(false); 

                }else{
                  HandelRegister(values, setSubmitting)
                }
              }}
              >

              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, isSubmitting }) => (

              <>

                    {
                      message &&(
                        <View style={{backgroundColor:'red', marginBottom:20, height:50, justifyContent:'center', borderRadius:10}}>
                      <Text style={{textAlign:'center', 
                        fontSize:20, color:'#ffff',
                        fontFamily: "BreeSerif-Regular"
                         }}
                        >
                           {message}
                        </Text>
                     </View>
                      )
                    }
              <View>
              <AntDesign name="user" size={24} color="black" style={styles.iconInput} />
                
                <TextInput
                      
                      style={styles.input}
                      name='last_name'
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      value={values.last_name}
                      placeholder="Last Name"
                      placeholderTextColor="#84817a"
                  />
                   {errors.last_name &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.last_name}</Text>
                    }

                            
              </View>

              <View>
              <AntDesign name="user" size={24} color="black" style={styles.iconInput} />
                
                <TextInput
                      
                      style={styles.input}
                      name= 'first_name'
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
                      placeholder="first Name"
                      placeholderTextColor="#84817a"
                  />
                  {errors.first_name &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.first_name}</Text>
                    }
              </View>

                <View>
                <AntDesign name="mail" size={24} color="black" style={styles.iconInput}/>
                
                <TextInput
                     style={styles.input}
                     name= 'email'
                     onChangeText={handleChange('email')}
                     onBlur={handleBlur('email')}
                     value={values.email}
                     placeholder="YOUR EMAIL"
                     placeholderTextColor="#84817a"
 
                 />
                 {errors.email &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.email}</Text>
                    }
                </View>
                
                <View>

                <Feather name="phone" size={24} color="black" style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    name= 'phone'
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="PHONE NUMBER"
                    placeholderTextColor="#84817a"
                />
                {errors.phone &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.phone}</Text>
                    }
                </View>

                <View>
                <Feather name="lock" size={24} color="black" style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    name= 'password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="PASSWORD"
                    placeholderTextColor="#84817a"
                    secureTextEntry={true}

                />
                {errors.password &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.password}</Text>
                    }
                </View>

                <View>

                
                <AntDesign name="home" size={24} color="black" style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholder="YOUR ADDRESS"
                    placeholderTextColor="#84817a"
                    icon="mail"
                />
                {errors.address &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.address}</Text>
                    }
                </View>

               <View style={{}}>
               {
                  !isSubmitting && (
                    <Button onPressFunction={handleSubmit}
                        title="Sign up"
                        
                 />
                  )
                }
                 {isSubmitting && (
                   <Button disabled={true}
                   title={<ActivityIndicator size="large" color="#fff" />}
                   
               />
                 
                )}

                   
               </View>
                

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
     flex: 1,
     padding:20
    },
    inputContainer:{
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "rgba(200, 200, 200, 0.35)",
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
        paddingHorizontal:50,
        color: "#4b4b4b",
        fontWeight: 'bold',
        height: Dimensions.get('window').width*0.13,
        borderRadius: 10,
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
  
   
  });
   
   
