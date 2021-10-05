
  import React, { useState, useEffect } from 'react'
  import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Pressable} from 'react-native'
  import {
    Title,
    Caption
  } from 'react-native-paper';

  import axios from "axios";
  import AsyncStorage from '@react-native-async-storage/async-storage'
  
  import { AntDesign } from '@expo/vector-icons';
  import { FontAwesome5 } from '@expo/vector-icons';
  import { Colors } from '../../Component/Style';
    const {primary, button, body} = Colors

  import AppLoading from 'expo-app-loading';
  import { 
    useFonts, 
    Inter_200ExtraLight,
    
    } from '@expo-google-fonts/inter';
  import AddProduct from '../../Component/AddProduct';
  import Cash from '../../Component/Cash';
  
  
  
  
    export default function Details ({route, navigation}) {
      const data = route.params;
      const carnetId = data.id;
    //  console.log('hhhhhdetaill:', Carnet);
      
      // const idC = Carnet._id
      // const Clinet_Name = Carnet.CarnetName
      // const Total = Carnet.total


      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisibleCash, setModalVisibleCash] = useState(false);
      const [carnet, setCarnet] = useState([])
      const [products, setProducts] = useState([])
      // const [refreshing, setRefreshing] = useState(false)
  
  
        
         useEffect(()=>{

          const fetchData = async()=>{

            // get info Carnet
            const url1 = 'http://10.0.2.2:7000/Carnet/carnetId/'   
            await axios.get(url1 + carnetId)
            .then(response=>{  
              setCarnet(response.data.carnet)
              
            }).catch(err=>{
              console.log(err);
            })

            // Get product by Carnet
            const url = 'http://10.0.2.2:7000/product/productbycarnet/'
            
            //setRefreshing(true)
  
                 axios.get(url + carnetId)
                .then(response=>{
                    setProducts(response.data.result)
                  })
                
                .catch(err=>{
                  //setRefreshing(true)
                  console.log(err);
                })
  
           }
           fetchData()

          return ()=>{

          }
         }, [])
        
  
        const changeModelVisible = () =>{
          setModalVisible(!modalVisible)

        }
        const changeModelVisibleCash = () =>{
          setModalVisibleCash(!modalVisibleCash)
        }
        
        const getDatePayment = (date)=>{
          let DateP = new Date(date);
          return DateP.getDate() + '/' + (DateP.getMonth() + 1) + '/' + DateP.getFullYear();
        }
  
      let [fontsLoaded] = useFonts({
          Inter_200ExtraLight,
          'BreeSerif-Regular': require('../../../assets/fonts/BreeSerif-Regular.ttf')
        });
  
        if (!fontsLoaded) {
          return <AppLoading />;
        }
  
          return (
       
              <View style={styles.container}>
                 <View style={styles.table}>

                 <View style={styles.infoBoxWrapper}>
                      <View style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1,
                        width: '40%',
                      }]}>
                        <Title>{carnet.CarnetName}</Title>
                      </View>
                      <View style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1,
                        width: '40%',
                      }]}>
                         <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', color: '#ff3838'}}>{carnet.total} DH</Text>
                         <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular', }}>Crédit</Text> 
                      </View>
                      <View style={[styles.infoBox, {
                        width: '24%',
                      }]}>
                       
                       <TouchableOpacity 
                         onPress = {()=> navigation.push("Reminder", {carnet})}
                        
                         >
                         <AntDesign style={{paddingHorizontal: 10}} name="sharealt" size={24} color="black" />
                           
                         </TouchableOpacity>
                          </View>
                  </View>
                     
                 </View>
  
                 <FlatList 
                  style={styles.flatlist}
                  data={products}
                  keyExtractor = {(item) => item._id}
                  renderItem = {({item}) => (
              
                  <View 
                     style={{
                         flexDirection:'row',
                         backgroundColor: '#FFF',
                         marginHorizontal: 20,
                         padding: 20,
                         borderRadius: 20,
                         marginBottom: 10,
                         justifyContent:'space-between'
                     }}
                     > 
                          <View style={{width:200}}>
                          {
                              item.Type == "Product"
                              ?
                              <Text style={{fontSize:Dimensions.get('window').width * 0.05, fontFamily:'BreeSerif-Regular', color:'black'}}>{item.Date}</Text>
                              :
                              <Text style={{fontSize:Dimensions.get('window').width * 0.05, fontFamily:'BreeSerif-Regular', color:'black'}}>{getDatePayment(item.createdAt)}</Text>

                            }   
                          <Text style={{fontSize:Dimensions.get('window').width * 0.05, fontFamily:'BreeSerif-Regular', color:'#777777'}}>{item.ProductName}</Text>
                          </View>
                     
                          <Text style=
                              {{
                                fontSize: 20, fontFamily:'BreeSerif-Regular', 
                                color : item.Type == 'Payment' ? '#27ae60' : '#ff3838'
                              }}
                              >
                              {item.Price} DH
                           </Text>
                                  
                      </View>
                      
                          
                        )}
                  />
  
                      <View style={styles.ViewBtn}>
                        
                         <TouchableOpacity 
                         onPress={() => {setModalVisibleCash(true)}}
                          style={{
                              backgroundColor: button,
                              padding:10,
                              height: 55,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width:"45%"
                             
                          }}
                         >
                             <View style={{flexDirection:'row'}}>
                                  <FontAwesome5 style={{paddingHorizontal: 10}} name="cash-register" size={24} color="white" />
                                  <Text style={{fontSize:17, textAlign:"center", fontFamily:'BreeSerif-Regular', color:"#fff" }}>Cash</Text>
                              </View> 
                         </TouchableOpacity>
  
                         <TouchableOpacity 
                          onPress={() => {setModalVisible(true)}}
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
                               <AntDesign style={{paddingHorizontal: 10}} name="plus" size={24} color="white" />
                               <Text style={{fontSize:17, textAlign:"center", fontFamily:'BreeSerif-Regular',color:"#fff" }}>Crédit</Text>                         
                             </View>

                         </TouchableOpacity>
                        
                      </View>
  
                 {/* Model */}    
                  <View style={styles.centeredView}>
                       <Modal
                         animationType="slide"
                         transparent={true}
                         visible={modalVisible}
                         onRequestClose={() => {
                         
                         }}
                       >

                         <View style={{
                           flex : 1,
                           backgroundColor: "#000000AF",
                           justifyContent: 'flex-end'
                         }}>

                          <AddProduct 
                           navigation={navigation}
                           Carnet = {carnet}
                           change = {changeModelVisible}
                         />

                         </View>

                       </Modal>
                  </View>

                       <Modal
                         animationType="slide"
                         transparent={true}
                         visible={modalVisibleCash}
                         onRequestClose={() => {
                         
                         }}
                       >

                         <View style={{
                           flex : 1,
                           backgroundColor: "#000000AA",
                           justifyContent: 'flex-end'
                         }}>

                          <Cash 
                           navigation={navigation}
                           Carnet = {carnet}
                           change = {changeModelVisibleCash}
                           
                         />
                         
                         </View>

                      </Modal>
              </View>
                 
              
          
          )
      
  }
  
  
  const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor: body
      },

      table: {
        padding: 20,
        backgroundColor:'#fff',
        flexDirection: 'row',
        height: Dimensions.get('window').width * 0.2,
        width: Dimensions.get('window').width * 1,
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000", 
        elevation: 10,
      },

      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      image: {
          width: 40,
          height: 40,
          borderRadius: 50
      },
      ViewBtn:{
        padding: 20,
          width: '100%',
          flexDirection:'row',
          justifyContent:'space-between',
      },

  
  // CSS Model
  
     
  });
  
  
  
  
   
   
   
   