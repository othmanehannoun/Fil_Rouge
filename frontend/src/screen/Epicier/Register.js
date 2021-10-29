import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button ,ScrollView, KeyboardAvoidingView, ActivityIndicator, Dimensions } from 'react-native'
import BTN from '../../button/Button';
import Header from '../../Component/Header';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {Formik} from 'formik'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from "expo-document-picker";

import * as Yup from 'yup'

import { Colors } from '../../Component/Style';
const {primary} = Colors

import config from '../../../config';
const {apiUrl} = config;

import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';


export default function Register ({navigation}){

  const [message, setMessage] = React.useState();
  const [fileOne, setFileOne] = React.useState();



  const pickDocument = async () => {
    
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
     // console.log('AAAAAAAAAAA', result);
  
      if (!data.cancelled) {
        
          setFileOne(data.uri);
        
      }

  };


  //   const previewFile = (file) =>{
  //   const reader = new FileReader();
  //   // hna kan diro convert image to url
  
  //     reader.readAsDataURL(file);
 
  //     reader.onloadend = () => {
  //       const aa = reader.result;
  //       setFileOne(aa)
  //       console.log(aa);
  //     };
  // }

  const phoneRegExp = /^\(?([+]{1})\)?([0-9]{3})[-. ]?([5-7]{1})?([0-9]{9})$/

  const validationSchema = Yup.object({
    Username: Yup.string().min(6, 'length must be at least 6 characters long').required('Last Name is Required'),
    Magazine_Name: Yup.string().min(6, 'length must be at least 6 characters long').required('Last Name is Required'),
    email: Yup.string().email('Invalid email address').required('email is Required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is Required'),
    password: Yup.string().min(10, 'Invalid password').required('Required').required('password is Required'),
    address: Yup.string().min(6, 'Invalid address : length must be at least 6 characters long ').required('adress is Required'),
  })

    const initialValues = {Username : '',  Magazine_Name : '', email : '',phone : '', password : '', address : ''}

    const HandelRegister =(values, setSubmitting)=>{
      navigation.navigate('PhoneNumber', {infos : values})
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
                if(values.Username=='' || values.Magazine_Name == '',values.email=='' ||values.phone=='' ||values.address=='' ||values.password==''){
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
                      name='Username'
                      onChangeText={handleChange('Username')}
                      onBlur={handleBlur('Username')}
                      value={values.Username}
                      placeholder="Nom d'utilisateur"
                      placeholderTextColor="#84817a"
                  />
                   {errors.Username &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.Username}</Text>
                    }

                            
              </View>

             
             
              <View>
              <AntDesign name="user" size={24} color="black" style={styles.iconInput} />
                
                <TextInput
                      
                      style={styles.input}
                      name= 'Magazine_Name'
                      onChangeText={handleChange('Magazine_Name')}
                      onBlur={handleBlur('Magazine_Name')}
                      value={values.Magazine_Name}
                      placeholder="Nom du magazine"
                      placeholderTextColor="#84817a"
                  />
                  {errors.Magazine_Name &&
                     <Text style={{ fontSize: 15, color: 'red', textAlign:'center', fontWeight:'bold' }}>{errors.Magazine_Name}</Text>
                    }
              </View>
              {/* <TouchableOpacity>
                <Button
                  title="upload your file"
                  color="black"
                  onPress={pickDocument}
                />
              </TouchableOpacity> */}
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
                    keyboardType={'numeric'}
                    name= 'phone'
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value = {values.phone}cn
                    placeholder="+XXX-XXXXXXXXXX"
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
                    <BTN onPressFunction={handleSubmit}
                        title="Sign up"
                        
                 />
                  )
                }
                 {isSubmitting && (
                   <BTN disabled={true}
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
   
   
