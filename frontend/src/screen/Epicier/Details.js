  import React, { useState, useEffect } from 'react'
  import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Pressable,LogBox} from 'react-native'
  import { Title } from 'react-native-paper';
  import axios from "axios";
  // import AsyncStorage from '@react-native-async-storage/async-storage'
  import { AntDesign } from '@expo/vector-icons';
  import { FontAwesome5 } from '@expo/vector-icons';
  import AppLoading from 'expo-app-loading';
  import { useFonts, Inter_200ExtraLight } from '@expo-google-fonts/inter';
  import AddProduct from '../../Component/AddProduct';
  import Cash from '../../Component/Cash';
  import { Colors } from '../../Component/Style';
  import config from '../../../config';

    const {apiUrl} = config;
    const {primary, button, body} = Colors

 
  
    export default function Details ({route, navigation}) {
      const data = route.params;
      const carnetId = data.id;
  
      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisibleCash, setModalVisibleCash] = useState(false);
      const [carnet, setCarnet] = useState([])

    
      const [products, setProducts] = useState([])
      const [payment, setPayment ] = useState([])
      const [margeData, setMargeData] = useState([])
      const [change, setChange] = useState(false)
      // const [refreshing, setRefreshing] = useState(false)
     
     
  

       
     
    const MergeData = ()=>{
      const merge = [...products, ...payment]
      const all = merge.sort((a, b)=> b.createdAt > a.createdAt ) 
      setMargeData(all);
      // setChange(!change)
      LogBox.ignoreAllLogs()
    }
      
         useEffect(()=>{
          let isCancelled = false;
                    
          const fetchData = async() =>{
            const url1 = apiUrl + '/Carnet/carnetId/'   
            await axios.get(url1 + carnetId)
            .then(response=>{  
              setCarnet(response.data.carnet)
              
            }).catch(err=>{
              console.log(err);
            })
            
      
            // Get Product
            const url = apiUrl + '/product/productbycarnet/'
            
                await axios.get(url + carnetId)
                .then(response=>{
                    setProducts(response.data.result)
                  })
                
                .catch(err=>{
                  console.log(err);
                })
      
            // Get Payment
      
            const url3 = apiUrl + '/getPayment/'
            
               await axios.get(url3 + carnetId)
              .then(response=>{
                  setPayment(response.data.payment)
                 // console.log(payment);
                })
              
              .catch(err=>{
                console.log(err);
              })
           }
           fetchData()
           MergeData()
      
         
          return () =>{isCancelled = true}
          
         }, [products, payment])

         
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
                     
                
                 <View style={{
                      flexDirection:'row', justifyContent: 'space-between', 
                      paddingHorizontal:25, padding:10, marginBottom:10, 
                      }}
                    >
                      <Text style={{fontSize:18, fontFamily:'BreeSerif-Regular', color:'#777777'}}>Informations</Text>
                      <Text style={{fontSize:18, left: 20, fontFamily:'BreeSerif-Regular', color:'#777777'}}>Crédit</Text>
                      <Text style={{fontSize:18, fontFamily:'BreeSerif-Regular', color:'#777777'}}>Paiement</Text>
                  </View>

                 <FlatList 
                  style={styles.flatlist}
                  data={margeData}
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
                          {
                            item.Type == "Product" 
                            ?

                           <>
                            <View style={{width:200}}>
                            
                            <Text style={{fontSize:Dimensions.get('window').width * 0.05, fontFamily:'BreeSerif-Regular', color:'black'}}>{item.Date}</Text>

                            <Text style={{fontSize:Dimensions.get('window').width * 0.05, fontFamily:'BreeSerif-Regular', color:'#777777'}}>{item.ProductName}</Text>
                            </View>
                            <View style={{
                                  backgroundColor: "#ffeded", right:100, 
                                  width:100, height:97, 
                                  position:'absolute', justifyContent: 'center'}}>
                            <Text style=
                                {{
                                  fontSize: 20, fontFamily:'BreeSerif-Regular', color:'#ff3838',textAlign:'center'
                                }}
                                >
                                {item.Price} DH
                            </Text>
                            </View>
                           </>
                                  
                            :
                            <>
                             <View style={{width:200}}>
                      
                              <Text style={{fontSize:Dimensions.get('window').width * 0.05, fontFamily:'BreeSerif-Regular', color:'black'}}>{getDatePayment(item.createdAt)}</Text>
                              </View>
                              <View style={{ backgroundColor: "#edfff0", right:0, 
                                    width:100, height:68, 
                                    position:'absolute', justifyContent: 'center'}}>
                              <Text style=
                                  {{
                                    fontSize: 20, fontFamily:'BreeSerif-Regular', color: '#27ae60',textAlign:'center'
                                  }}
                                  >
                                  {item.totalPrice} DH
                              </Text>
                              </View>
                            </>
                            
                          }
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

      infoBoxWrapper: {
        marginBottom: 5,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFF',
        height: Dimensions.get('window').width * 0.17,
        width: Dimensions.get('window').width * 1,
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
  
  
  
  
   
   
   
   