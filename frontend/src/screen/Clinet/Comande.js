import React, {useState} from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity , Dimensions, Button } from 'react-native'
import {TextInput} from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';




// import DateTimePickerModal from "react-native-modal-datetime-picker";

import AddButton from '../../button/Button' 


import { Colors } from '../../Component/Style';

const {primary} = Colors

export default function Comande() {

    const [Price, setPrice] = useState();
    const [lodding, setLodding] = useState(false);


    return(
       
         <View style={styles.centeredView}>
                   
              <View style={styles.modalView}>
              
              <View style={styles.inputContainer}>

          <>
              
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
                    <AddButton 
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
      
        
    
    });