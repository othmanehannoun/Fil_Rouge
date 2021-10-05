import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, ScrollView , KeyboardAvoidingView} from 'react-native'
import Button from '../../button/Button';
import { TextInput } from 'react-native-paper';
import * as Yup from 'yup'
import { Formik } from "formik";
import axios from 'axios';
import { Colors } from '../../Component/Style';

const {primary, body} = Colors

// import AsyncStorage from '@react-native-async-storage/async-storage';


import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';

export default function UserUpdate ({route, navigation}){
    const data = route.params;
    const id = data.id;
    
    const validationSchema = Yup.object({
        
        last_name: Yup.string().min(4, 'Invalid').required('Last Name is Required '),
        first_name: Yup.string().min(4, 'Invalid').required('First Name is Required '),
        email: Yup.string().email('Invalid email address').required('email is Required '),
        phone: Yup.number().min(10, 'Invalid Phone').required('Required').required('password is Required'),
        address: Yup.string().min(6, 'Invalid Address').required('Required').required('password is Required'),
        
      })
      
    //   USESTATE 
    const [user, setUser] = useState([])
    const [message, setMessage] = useState();


    const initialValues = {
            last_name: user.last_name, 
            first_name: user.first_name, 
            email: user.email,
            phone: user.phone, 
            address: user.address
        }
   

    //    Get Epicier 
       const getUser = async()=>{
        const url = 'http://10.0.2.2:7000/getUser/'
        try{   
          await axios.get(url + id)
        //   console.log(id)
          .then(response=>{
            
            setUser(response.data.user)
        
          }).catch(err=>{
            console.log(err);
          })

        }  
  
        catch(error){  
          alert(error)  
        }
       }
     
     
    //    Function UPDATE 
       const UpdateData = async(values, setSubmitting) => {
            handleMessage(null);
            // console.log(values);
    
            const url = 'http://10.0.2.2:7000/update/' + id ;
            await axios.patch(url, values)
            .then((response) => {
                alert('SUCCESS UPDATE')
                // navigation.navigate('Profil')
                
                setSubmitting(false);
            })
            .catch((error) => {
                setSubmitting(false);
                console.log(error);
            });
       };
   
       useEffect (()=>{
           getUser()
       }, [])


       const handleMessage = (message) => {
         setMessage(message);
       };
       

    let [fontsLoaded] = useFonts({
        Inter_200ExtraLight,
        'BreeSerif-Regular': require('../../../assets/fonts/BreeSerif-Regular.ttf')
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      }
  
        return (
            <KeyboardAvoidingView>
             <ScrollView >
             <View style={styles.container}>
                <Text style={{fontSize:25, marginBottom: 25, fontFamily:'BreeSerif-Regular'}}>Modifier les informations</Text>   
            <View style={styles.inputContainer}> 
         
           
            <Formik
                  initialValues={initialValues}
                  enableReinitialize={true}
                  validationSchema = {validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    
                      UpdateData(values, setSubmitting);
                    
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
                  
                {/* <Feather name="phone" size={24} color="black" style={styles.iconInput}/> */}
                <TextInput
                    style={styles.input}
                    label="Last Name"
                    mode='outlined'
                    name = 'last_name'
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    value={values.last_name}
                    placeholder="last_name"
                    placeholderTextColor="#84817a"
                />
                 {errors.last_name &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.last_name}</Text>
                    }
              </View>

              <View>
                  
                  {/* <Feather name="phone" size={24} color="black" style={styles.iconInput}/> */}
                  <TextInput
                      style={styles.input}
                      label="First Name"
                      mode='outlined'
                      name = 'first_name'
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      value={values.first_name}
                      placeholder="first_name"
                      placeholderTextColor="#84817a"
                  />
                   {errors.first_name &&
                       <Text style={{ fontSize: 10, color: 'red' }}>{errors.first_name}</Text>
                      }
                </View>
       
               <View>
               {/* <Feather name="lock" size={24} color="black" style={styles.iconInput}/> */}
                 <TextInput
                    style={styles.input}
                    label="Adress Email"
                    mode='outlined'
                    name='email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="email"
                    placeholderTextColor="#84817a"
                />
                 {errors.email &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                    }
               </View>

               <View>
               {/* <Feather name="lock" size={24} color="black" style={styles.iconInput}/> */}
                 <TextInput
                    style={styles.input}
                    label="Phone Number"
                    mode='outlined'
                    name='phone'
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="phone"
                    placeholderTextColor="#84817a"
                />
                 {errors.phone &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>
                    }
               </View>

               <View>
               {/* <Feather name="lock" size={24} color="black" style={styles.iconInput}/> */}
                 <TextInput
                    style={styles.input}
                    label="Adrees"
                    mode='outlined'
                    name='address'
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholder="address"
                    placeholderTextColor="#84817a"
                />
                 {errors.address &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
                    }
               </View>

 
                {
                  !isSubmitting && (
                    <Button onPressFunction={handleSubmit}
                    title="UPDATE"
                />
                  
                )}

                 {isSubmitting && (
                   <Button disabled={true}
                   title={<ActivityIndicator size="large" color="#fff" />}
                   
                   />
                 
                )}
                
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
     backgroundColor: body,
     flex: 1,
     padding:20,
     justifyContent: 'center',
     alignItems: 'center'
    },
    inputContainer:{
        padding: 30,
        backgroundColor: "#fff",
        shadowColor: "rgba(90, 100, 100, 10)",
        width: Dimensions.get('window').width * 0.9,
        height: 'auto',
        borderRadius: 30,
        justifyContent: 'center',
        shadowColor: "#000",  
        elevation: 10,
        
    },
    input: {
        backgroundColor: '#f5f6fa',
        height: 45,
        marginVertical: 10,
        color: "#4b4b4b",
        fontWeight: 'bold',
        borderRadius: 10,
        shadowColor: "rgba(200, 200, 200, 0.35)",
        borderColor: "rgba(171, 180, 189, 0.65)",
      },
     
  });
   
   
