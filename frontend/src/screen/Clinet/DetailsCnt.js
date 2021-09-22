
  import React, { useState, useEffect } from 'react'
  import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Pressable} from 'react-native'
  
  import {Title} from 'react-native-paper';
  import { WebView } from 'react-native-webview';

  import axios from "axios";
  import AsyncStorage from '@react-native-async-storage/async-storage'
  
  // import { AntDesign } from '@expo/vector-icons';
  import { FontAwesome } from '@expo/vector-icons';
  
  import AppLoading from 'expo-app-loading';
  import { 
    useFonts, 
    Inter_200ExtraLight,
    
    } from '@expo-google-fonts/inter';
  
  
  // import ReactDOM from "react-dom";
  
  // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

  
  
    export default function DetailsCnt ({route, navigation}) {
      const Carnet = route.params;
     
      const idC = Carnet.Carnet._id
      const Clinet_Name = Carnet.Carnet.CarnetName
      const Total = Carnet.Carnet.total
    
    

      AsyncStorage.setItem('Carnet',JSON.stringify(Carnet.Carnet));

      const [products, setProducts] = useState([])
     

        // START BUTTON PAYPAL 

        const [showModal, setShowModal] = useState(false)
       

        handleResponse = data => {
            if (data.title === "success") {
                setShowModal(false);
                alert('Success')
            } else {
                return;
            }
        };

        //END BUTTON PAYPAL 
  
  
        
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
        
    const getDatePayment = (date)=>{
      let DateP = new Date(date);
      return DateP.getDate() + '/' + (DateP.getMonth() + 1) + '/' + DateP.getFullYear();
    }

    // const getTotalPrice = () => {
    // return products.reduce((price, item) => Number(item.Price) + price, 0);
    // };

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
                          <View style={{
                               
                              // backgroundColor:'red', 
                              width:200,
  
                              }}>
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
                        
                <Modal
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <WebView
                        source={{ uri: `http://10.0.2.2:7000/Carnet/paypal/${idC}` }}
                        onNavigationStateChange={data =>
                            handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                 
                 <TouchableOpacity 
                          onPress={() => setShowModal(true)}
                          style={{
                              backgroundColor:"#00457C",
                              padding:10,
                              height: 55,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width:"45%"
                             
                          }}
                         >
                             <View style={{flexDirection:'row'}}>

                                  <FontAwesome name="paypal" style={{paddingHorizontal: 10}} size={24} color="white" />
                                  {/* <FontAwesome5 style={{paddingHorizontal: 10}} name="cash-register" size={24} color="white" /> */}
                                  <Text style={{fontSize:17, textAlign:"center", fontFamily:'BreeSerif-Regular', color:"#fff" }}>Pay with Paypal</Text>
                              </View> 
                         </TouchableOpacity> 
  
 
                        
                      </View>
  
                
              </>
                 
              
          
          )
      
  }
  
  
  const styles = StyleSheet.create({
      container:{
        flex:1,
        // backgroundColor:"#F5FDFF",
      },

      flatlist:{
        height: "100%"
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
      width: '100%',
      justifyContent:'center', 
      margin: 40
  },
  });
  
  
  
  
   
   
   
   