
  import React, { useState, useEffect } from 'react'
  import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Pressable} from 'react-native'

  import {Title} from 'react-native-paper';
  import { WebView } from 'react-native-webview';

  import axios from "axios";
  
  import { FontAwesome } from '@expo/vector-icons';
  
  import AppLoading from 'expo-app-loading';

  import { 
    useFonts, 
    Inter_200ExtraLight,  
    } from '@expo-google-fonts/inter';
  
    import config from '../../../config';
    const {apiUrl} = config;
  // import ReactDOM from "react-dom";
  
  // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

  
  
    export default function DetailsCnt ({route, navigation}) {
      const data = route.params;
      const carnetId = data.id;
         

      // AsyncStorage.setItem('Carnet',JSON.stringify(Carnet.Carnet));

      const [carnet, setCarnet] = useState([])
      const [products, setProducts] = useState([])
      const [payment, setPayment ] = useState([])

      const [margeData, setMargeData] = useState([null])
      

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
        
        

        const MergeData = () =>{
              
            var mergeResult = [...products, ...payment] 
            const all = mergeResult.sort((a, b)=> b.createdAt > a.createdAt )
            setMargeData(all);

           
            
          }
         
        
        useEffect(()=>{
         
          let estAffiche = false; // Ce booléen va indiquer que le composant est affiché

          const fetchData = async()=>{

            // get info Carnet
              const url1 = apiUrl + '/Carnet/carnetId/'   
              await axios.get(url1 + carnetId)
              .then(response=>{  
                if(!estAffiche){
                  setCarnet(response.data.carnet)
                }
                
                
              }).catch(err=>{
                console.log(err);
                return err
              })
    
              // GET PRODUCTS
              const url2 =  apiUrl + '/product/productbycarnet/'
       
                   await axios.get(url2 + carnetId)
                  .then(response=>{
                      if(!estAffiche){
                        setProducts(response.data.result)
                      }
                    })
                  
                  .catch(err=>{
                    console.log(err);
                    return err
                  })
    
                   // Get Payment
                  const url3 = apiUrl + '/getPayment/'
                
                  await axios.get(url3 + carnetId)
                    .then(response=>{
                      if(!estAffiche){
                        setPayment(response.data.payment)
                      }
                      })
                    
                    .catch(err=>{
                      console.log(err);
                      return err
                    })
             }
             fetchData()
             MergeData()

         return () => { estAffiche = true } // Cette fonction sera utilisée lors du nettoyage du c
         
        }, [payment])



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
                 

                 <View style={styles.infoBoxWrapper}>
                      <View style={[styles.infoBox, {
                         borderRightColor: '#dddddd',
                        borderRightWidth: 1
                      }]}>
                        <Title>{carnet.CarnetName}</Title>
                      </View>
                      <View style={styles.infoBox}>
                         <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', color: '#ff3838'}}>{carnet.total} DH</Text>
                         <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular', }}>Crédit</Text> 
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
                         borderRadius: 10,
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
                          fontSize: 20, fontFamily:'BreeSerif-Regular', color:'#ff3838', textAlign:'center'
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
                            fontSize: 20, fontFamily:'BreeSerif-Regular', color: '#27ae60', textAlign: "center"
                          }}
                          >
                          {item.totalPrice} DH
                      </Text>
                      </View>
                    </>
                    
                }
                                  
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
                        source={{ uri: apiUrl + `/Carnet/paypal/${carnetId}` }}
                        onNavigationStateChange={data =>
                            handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                 
                 <View style={{flexDirection:'row'}}>
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

                          <FontAwesome name="paypal" style={{paddingHorizontal: 5}} size={24} color="white" />
                          {/* <FontAwesome5 style={{paddingHorizontal: 10}} name="cash-register" size={24} color="white" /> */}
                          <Text style={{fontSize:17, textAlign:"center", fontFamily:'BreeSerif-Regular', color:"#fff" }}>Pay with Paypal</Text>
                      </View> 
                      
                  </TouchableOpacity> 

                  {/* <BtnComande  title="Commande"/> */}
                 </View>


                
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
          margin: Dimensions.get('window').width * 0.04
      },
      });
      
  
  
  
   
   
   
   