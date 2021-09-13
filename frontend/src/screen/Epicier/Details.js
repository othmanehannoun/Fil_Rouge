
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
  
  import AppLoading from 'expo-app-loading';
  import { 
    useFonts, 
    Inter_200ExtraLight,
    
    } from '@expo-google-fonts/inter';
  import AddProduct from '../../Component/AddProduct';
  import Cash from '../../Component/Cash';
  
  
  
  
    export default function Details ({route, navigation}) {
      const Carnet = route.params;
     //  console.log('hhhhhdetaill:', Carnet);
      
      const idC = Carnet.Carnet._id
      const Clinet_Name = Carnet.Carnet.CarnetName
      const Total = Carnet.Carnet.total


     
      //console.log(idC);

      AsyncStorage.setItem('Carnet',JSON.stringify(Carnet.Carnet));


      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisibleCash, setModalVisibleCash] = useState(false);
      const [products, setProducts] = useState([])
      // const [refreshing, setRefreshing] = useState(false)
  
  
        
         useEffect(()=>{

          const fetchData = ()=>{
            const url = 'http://10.0.2.2:7000/product/productbycarnet/'
            
            //setRefreshing(true)
  
                 axios.get(url + idC)
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
       
              <>
                 <View style={styles.table}>

                 <View style={styles.infoBoxWrapper}>
                      <View style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1
                      }]}>
                        <Title>{Clinet_Name}</Title>
                      </View>
                      <View style={styles.infoBox}>
                         <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', color: '#ff3838'}}>{Total} DH</Text>
                         <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular', }}>Crédit</Text> 
                      </View>
                  </View>
                     
                     {/* <View>
                         <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', color: '#ff3838'}}>{getTotalPrice()} DH</Text>
                         <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular', }}>Crédit</Text>
                     </View> */}
                 </View>
  
                 <FlatList 
                  style={styles.flatlist}
                  data={products}
                  // onRefresh={() => HandelRefresh()}
                  // refreshing={refreshing}
                  keyExtractor = {(item) => item._id}
                  renderItem = {({item}) => (
              
                  <TouchableOpacity
                      style={{marginBottom: 10}}
                  >
                  <View 
                     style={{
                         flexDirection:'row',
                         backgroundColor: '#FFF',
                         marginHorizontal: 20,
                         padding: 20,
                         borderRadius: 20,
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
                      </TouchableOpacity>
                          
                        )}
                  />
  
                      <View style={styles.ViewBtn}>
                        
                         <TouchableOpacity 
                         onPress={() => {setModalVisibleCash(true)}}
                          style={{
                              backgroundColor:"#44bd32",
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
                              backgroundColor:"#ff3838",
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
                           change = {changeModelVisibleCash}
                           
                         />
                         
                         </View>

                      </Modal>
              </>
                 
              
          
          )
      
  }
  
  
  const styles = StyleSheet.create({
      container:{
        flex:1,
       
        // backgroundColor:"#F5FDFF",
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
        width: '50%',
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
  
  
  
  
   
   
   
   