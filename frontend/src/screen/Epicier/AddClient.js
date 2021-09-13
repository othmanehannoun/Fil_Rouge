import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import Button from '../../button/Button';
import { TextInput } from 'react-native-paper';
// import Header from '../../Component/Header'
// import { AntDesign } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Colors } from '../../Component/Style';

const {primary} = Colors

import AsyncStorage from '@react-native-async-storage/async-storage';


import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';

export default function AddClient ({navigation}){

  const [CarnetName, setCarnetName] = useState(null);
  const [magazineName, setMagazineName] = useState();
  const [idClient, setIdClient] = useState(null);
  const [idEp, setIdEpicier] = useState();
  //console.log("hada howa" , idEp);

  const [lodding, setLodding] = useState(false);
  const [message, setMessage] = useState();

  // const initialValues = {CarnetName:'', idEpicier:'', idClient: ''}

  
  
  const  getId = async() => {
    try{  
      let user = await AsyncStorage.getItem('user'); 
        let parsed = JSON.parse(user);  
        const idE = parsed._id
        const MagazineName = parsed.Magazine_Name
        //console.log(MagazineName);

        if(parsed !== null){
          setIdEpicier(idE)
          setMagazineName(MagazineName)
        }
        
    }catch(error){  
      alert(error)  
    } 
  };
  getId()
  
  const ClientInfo = {CarnetName, InfoEpicier: magazineName, idClient, idEpicier:idEp}
       // console.log(ClientInfo);

    const handleSubmit = async()=>{
        
          if(CarnetName == null || idClient == null ){
            handleMessage('Required all fields!')
          }

            else{
              const url = 'http://10.0.2.2:7000/Carnet/Carnet/';
              setLodding(true)
              await axios.post(url, ClientInfo)
                .then((response) => {
                  const result = response.data;
                  // console.log(result);
                  const {msg} = result
                  if(msg !== 'successfully'){
                    handleMessage(msg);
                    
                    
                  }else{
                    handleMessage('Successfully'); 
                     
                    navigation.navigate('Home')   
                  }
                  
                  setLodding(false)  
                })
                .catch((error) => {
                  setLodding(false)  
                  console.log(error);
                });
            }
        
     }
 
     


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
            // <KeyboardAvoidingView>
             // <ScrollView >

            <View style={styles.container}>
                
                <Text style={{fontSize:25, marginBottom: 25, fontFamily:'BreeSerif-Regular'}}>ADD NEW ClIENT</Text>   
            <View style={styles.inputContainer}> 
         
           
                {
                  message && (
                    <View style={{backgroundColor: message!=='Successfully' ? 'red': '#44bd32', marginBottom:20, height:50, justifyContent:'center', borderRadius:10}}>
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
                <TextInput
                     label="Client Name"
                     name = 'CarnetName'
                     mode='outlined'
                     theme={{colors:{primary:primary}}}
                     onChangeText={setCarnetName}
                     value={CarnetName}
                     placeholder="Enter the client name"
                     placeholderTextColor="#84817a"
                     style={{marginBottom:10}}
                 />
                
               </View>
                
                 <View>
                   <TextInput
                      
                      mode='outlined'
                      label='Clinet ID '
                      name = 'idClient'
                      onChangeText={setIdClient}
                      value={idClient}
                      placeholder="Id Client"
                      placeholderTextColor="#84817a"
                        
                  />
                   
                 </View>
                 
                 {
                  !lodding && (
                    <Button onPressFunction={handleSubmit}
                        title="Add New Client"
                    />
                  
                )}

                 {lodding && (
                   <Button disabled={true}
                   title={<ActivityIndicator size="large" color="#fff" />}
                   />
                  )}
                  

                
                        
               
            

                    
             </View>

            </View>

            // </ScrollView>
            // </KeyboardAvoidingView>
        )
    
}


const styles = StyleSheet.create({
    container: {
     backgroundColor:"#F5FDFF",
     flex: 1,
     padding:20,
     justifyContent: 'center',
     alignItems: 'center'
    },
    inputContainer:{
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "rgba(90, 100, 100, 10)",
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.9,
        borderRadius: 30,
        justifyContent: 'center',
        shadowColor: "#000",  
        elevation: 10,  
    },

    input: {
        backgroundColor: '#f5f6fa',
        marginVertical: 10,
        paddingHorizontal:40,
        color: "#4b4b4b",
        fontWeight: 'bold',
        height: 50,
        borderRadius: 10,
        shadowColor: "rgba(200, 200, 200, 0.35)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(171, 180, 189, 0.65)",
      },

      iconInput:{
        position:'absolute',
        color:'#4b4b4b',
        top:22,
        left:10,
        zIndex:1
    },
      submitContainer: {
        backgroundColor:"#3dc1d3",
        padding:10,
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').width * 0.05,
    },
  });
   
   
