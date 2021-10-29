
  import React, { useState, useEffect } from 'react'
  import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native'
  import * as Linking from 'expo-linking';

  import axios from 'axios'
  import AsyncStorage from '@react-native-async-storage/async-storage'

  import { AntDesign } from '@expo/vector-icons';
  import { FontAwesome5 } from '@expo/vector-icons';

  import { Colors } from '../../Component/Style';
    const {primary, button, body} = Colors
    
  import config from '../../../config';
    const {apiUrl} = config;

  import AppLoading from 'expo-app-loading';
  import { 
    useFonts, 
    Inter_200ExtraLight,
    
    } from '@expo-google-fonts/inter';

  
  
  
  
    export default function Reminder ({route, navigation}) {
      const data = route.params;
      const Carnet = data.carnet;
      
      //console.log('ZZZZZZZZ:', Carnet);
      

      const Total = Carnet.total
      const IdUser = Carnet.idClient



     
      //console.log(idC);

    //   const [modalVisible, setModalVisible] = useState(false);
    //   const [modalVisibleCash, setModalVisibleCash] = useState(false);
      const [Epicier, setEpicier] = useState([])
      const [client, setClient] = useState([])
    
      // const [refreshing, setRefreshing] = useState(false)
  
      const fetchEpicier = async()=>{
        
        try{  
          let Epicier = await AsyncStorage.getItem('epicier'); 
         
          let parsed = JSON.parse(Epicier);  
          setEpicier(parsed)
        }  
        catch(error){  
          alert(error)  
        }
      
      }
    
      const fetchClient = ()=>{
        const url =  apiUrl + '/getUser/'
            
        axios.get(url + IdUser)
            .then(response=>{
                setClient(response.data.user)
                
                })
            
            .catch(err=>{
                //setRefreshing(true)
                console.log(err);
            }) 
      } 


      useEffect(()=>{
            fetchEpicier()
            fetchClient()
      }, [])


      const HandelSMSPress = async() =>{{
          await Linking.openURL(`sms:${client.phone}?body=La dette totale que vous avez avec ${Epicier.Magazine_Name} est de ${Total} DH. Merci d'avance pour le paiement rapide `);
      }}
      const HandelWhatsappPress = async() =>{{
        await Linking.openURL(`https://wa.me/0616855202`);
    }}
        // const getDatePayment = (date)=>{
        //   let DateP = new Date(date);
        //   return DateP.getDate() + '/' + (DateP.getMonth() + 1) + '/' + DateP.getFullYear();
        // }
  
      let [fontsLoaded] = useFonts({
          Inter_200ExtraLight,
          'BreeSerif-Regular': require('../../../assets/fonts/BreeSerif-Regular.ttf')
        });
  
        if (!fontsLoaded) {
          return <AppLoading />;
        }
  
          return (
       
              <View style={styles.container}>
                <View style={styles.DivContainer}>
                   
                    <Text style={{
                        fontFamily:'BreeSerif-Regular', 
                        fontSize: 25,
                    }}>Rappel de Transaction</Text>
                     <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/rappel.png')}
                        resizeMode="contain"
                     />

                     <View style={{backgroundColor:'white', width: '90%', padding: 7, borderRadius: 30, shadowColor: "#000", elevation: 3, }}>
                         <Text style={{
                             textAlign:'center', fontFamily:'BreeSerif-Regular', 
                             fontSize: 25, color:'red'
                             }}
                        >{Total} DH</Text>
                     </View>
                     
                </View>
                <View style={styles.RappelView}> 
                   <Text style={{
                        fontFamily:'BreeSerif-Regular', 
                        fontSize: 20, textAlign: 'center' }}
                    >le rappel de paiement de la part du fournisseur {Epicier.Username} </Text>
                 </View>
  
                <View style={styles.ViewBtn}>
                
                    <TouchableOpacity 
                    onPress={() => {HandelWhatsappPress()}}
                    style={{
                        backgroundColor: '#36bd56',
                        padding:10,
                        height: 55,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:"45%"
                        
                    }}
                    >
                        <View style={{flexDirection:'row'}}>

                            <FontAwesome5 style={{paddingHorizontal: 5}} name="whatsapp" size={26} color="white" />
                            <Text style={{fontSize:20, textAlign:"center", fontFamily:'BreeSerif-Regular', color:"#fff" }}>Whatsapp</Text>
                        </View> 
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={() => {HandelSMSPress()}}
                    style={{
                        backgroundColor: primary,
                        padding:10,
                        height: 55,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:'45%'
                        
                    }}
                    >
                        <View style={{flexDirection:'row'}}>
                        <FontAwesome5 style={{paddingHorizontal: 5}} name="sms" size={26} color="white" />
                        <Text style={{fontSize:20, textAlign:"center", fontFamily:'BreeSerif-Regular',color:"#fff" }}>SMS</Text>                         
                        </View>

                    </TouchableOpacity>
                
                </View>

                
              </View>
                 
              
          
          )
      
  }
  
  
  const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor: body,
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
        
      },
      DivContainer:{
        padding: 30,
        backgroundColor: "#f3f9ff",
        shadowColor: "rgba(90, 100, 100, 10)",
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.9,
        marginBottom: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",  
        elevation: 10,  
    },
    tinyLogo: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.7,
        margin: Dimensions.get('window').width * -0.10,
  },
    RappelView:{
        padding: 15,
       
        shadowColor: "rgba(90, 100, 100, 10)",
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 20,
        justifyContent: 'center',
       
        
    },
      ViewBtn:{
       
          width: '100%',
          flexDirection:'row',
          justifyContent:'space-between',
      },

  
  // CSS Model
  
     
  });
  
  
  
  
   
   
   
   