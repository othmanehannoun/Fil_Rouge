import React, {useState} from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity , Dimensions, Button } from 'react-native'
import {TextInput} from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Formik} from 'formik'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


// import DateTimePickerModal from "react-native-modal-datetime-picker";

import AddButton from '../button/Button' 


import { Colors } from '../Component/Style';
const {primary} = Colors

export default function Cash (props) {

  //const [carnet, setCarnet] = useState([])
  const [Type, setType] = useState('Payment');
  const [Price, setPrice] = useState();
  const [lodding, setLodding] = useState(false);
  const [message, setMessage] = useState();
  
  const closseModel = () =>{
      props.change();
      // props.setData(data);
  }


  const handleMessage = (message) => {
    setMessage(message);
  };

  // API

  const HandelAddPaiment = async()=>{

    try{  
      let Carnet = await AsyncStorage.getItem('Carnet'); 
      let parsed = JSON.parse(Carnet);  
      const id = parsed._id
      const total = parsed.total
      // console.log(total);



      var price = parseInt(Price)

      const ProductInfo = {ProductName: 'Payment', Price:price, idCarnet: id, Type}
       // console.log(ProductInfo);


    const url = 'http://10.0.2.2:7000/product/AddProduct'
    setLodding(true)
      axios.post(url, ProductInfo).then(response=>{
        const result = response.data
        const {msg} = result
        if(msg !== 'successfully'){
          handleMessage('!!!!!!!!!!');
          setLodding(false)
          
        }else{
          handleMessage(msg);  
          setLodding(false)
          closseModel() 

         // props.navigation.navigate('Details')
          
        }
        
      })
      .catch(error=>{
       
        console.log(error);
      })
  
     }
     catch(error){
       alert(error)
     }
  }

      
        return (
         <View style={styles.centeredView}>
                   
              <View style={styles.modalView}>
              <Text style={{fontSize:25, marginBottom: 5, fontFamily:'BreeSerif-Regular', marginTop:'20%'}}>
                    Ajouter produit 
              </Text>
              <View style={styles.inputContainer}>

          <>
          {
                  message && (
                    <View style={{backgroundColor: message!=='successfully' ? 'red': '#44bd32', marginBottom:20, height:50, justifyContent:'center', borderRadius:10}}>
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
              {/* <FontAwesome name="money" size={24} color="black" style={styles.iconInput}/> */}
              <TextInput   
                     label="Product Price"
                     name = 'Price'
                     keyboardType={'numeric'}
                     mode='outlined'
                     theme={{colors:{primary:primary}}}
                     onChangeText={setPrice}
                     value={Price}
                     placeholder="Enter the Procuts Price"
                     placeholderTextColor="#84817a"
                     style={{marginBottom:10}}
                 />
              </View>

            <View>
            {/* <AddButton onPressFunction={HandelAddProduct}
            title="AJOUTER" /> */}
                 {
                  !lodding && (
                    <AddButton onPressFunction={HandelAddPaiment}
                        title = "VALIDER"
                    />
                  
                )}

                 {lodding && (
                   <AddButton disabled={true}
                   title={<ActivityIndicator size="large" color="#fff" />}
                   />
                  )}

            </View>
             </>
                
                  
              </View>
                        
                <FontAwesome style={styles.removeIcon} name="remove" size={35} color="red" 
                  onPress={() => closseModel()}
                />

              </View>
                   
                
        </View>
        )
    
}



const styles = StyleSheet.create({

// CSS Model

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      justifyContent: "flex-end"
    },

    modalView: {
      marginTop: Dimensions.get('window').width*0.09,
      backgroundColor: "#fff",
      borderColor: primary,
      borderWidth: 1,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      
    },
     
    inputContainer:{
        padding: 20,  
        shadowColor: "rgba(90, 100, 100, 10)",
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.4,
      
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
  
    removeIcon:{
      position: 'absolute',
      top: 20  
    }

});