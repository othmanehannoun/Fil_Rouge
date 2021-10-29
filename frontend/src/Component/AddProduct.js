import React, {useState} from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity , Dimensions, Button } from 'react-native'
import {TextInput} from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Formik} from 'formik'
import axios from 'axios';

import config from '../../config';
const {apiUrl} = config;


// import DateTimePickerModal from "react-native-modal-datetime-picker";

import AddButton from '../button/Button' 
// import MyDatePicker from '../button/DatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from '../Component/Style';
const {primary, button} = Colors

export default function AddProduct (props) {

  const Carnet = props.Carnet

  const [ProductName, setProductName] = useState();
  const [Price, setPrice] = useState();
  const [lodding, setLodding] = useState(false);
  const [message, setMessage] = useState();
  
  const closseModel = () =>{
      props.change();
      // props.setData(data);
  }

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('JJ/MM/AA') 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

   // Process the date values
   let tempDate = new Date(currentDate);
   let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
   let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes()
   setText(fDate)

    // Log the Time & Date values
    console.log(fTime)
    console.log(tempDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleMessage = (message) => {
    setMessage(message);
  };

  // API

  const HandelAddProduct = async()=>{

    try{  
     
      var price = parseInt(Price)
      const ProductInfo = {ProductName, Price:price, Date:text, idCarnet: Carnet._id, Type:'Product'}
       console.log(ProductInfo);


    const url2 = apiUrl + '/product/AddProduct'
    setLodding(true)
      axios.post(url2, ProductInfo).then(response=>{
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

              {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange} 
                      />
                    )}
                                    
              <View style={styles.modalView}>

              <Text style={{fontSize:25, marginBottom: 5, fontFamily:'BreeSerif-Regular', marginTop:'20%'}}>Ajouter produit </Text>

              


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
            {/* <MaterialIcons name="drive-file-rename-outline" size={24} color="black" style={styles.iconInput}/>                  */}
            <TextInput  
                     label="Product Name"
                     name = 'ProductName'
                     mode='outlined'
                     theme={{colors:{primary:primary}}}
                     onChangeText={setProductName}
                     value={ProductName}
                     placeholder="Enter the Product name"
                     placeholderTextColor="#84817a"
                     style={{marginBottom:10}}
                 />
    
            </View>
              
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
              {/* <MyDatePicker /> */}

              <View style={styles.dateStyle}>
                <TouchableOpacity 
                  onPress={() => showMode('date')}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign:'center', color: primary}}>{text}</Text>

                </TouchableOpacity>                
              </View>
              

                      

            {/* {!isDate && <StyledTextInput {...props} />} */}
              
              </View>

            <View>
            {/* <AddButton onPressFunction={HandelAddProduct}
            title="AJOUTER" /> */}
                 {
                  !lodding && (
                    <AddButton onPressFunction={HandelAddProduct}
                        title="Add New Product"
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
    //  marginTop: Dimensions.get('window').width*0.09,
      backgroundColor: "#fff",
      borderColor: primary,
      borderWidth: 1,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
    },
    
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
   
    inputContainer:{
        padding: 20,  
        shadowColor: "rgba(90, 100, 100, 10)",
        width: Dimensions.get('window').width,        
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
      dateStyle:{
      
        height: 50,
        borderWidth: 2,
        borderColor: primary,
        justifyContent:"center"
      },
  
    removeIcon:{
      position: 'absolute',
      top: 20
      
    }
});