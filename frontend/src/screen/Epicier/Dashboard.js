import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Button, } from 'react-native'
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { FontAwesome5 } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import { Colors } from '../../Component/Style';

import config from '../../../config';


const {apiUrl} = config;
const {primary, button, body} = Colors

  const  Dashboard = ({navigation})=> {
 
        const [masterData, setMasterData] = useState([])
        const [filterData, setFilterData] = useState([])
        const [search, setSearch] = useState('')
   
        useEffect(()=>{
          let isCancelled = false;

            const url = apiUrl + `/Carnet/carnetbyepicier/`

            try{  
            navigation.addListener('focus', async()=>{
              let Epicier = await AsyncStorage.getItem('epicier'); 
              // let token = await AsyncStorage.getItem('token'); 
              // console.log(token);
              let parsed = JSON.parse(Epicier);  
              const id = parsed._id
             

              await axios.get(url + id)
              .then(response=>{
                // console.log("hadi hiya data:", {...data[0]})
               if(!isCancelled){
                setFilterData(response.data.carnet)
                setMasterData(response.data.carnet)
               }
                
              }).catch(err=>{
                console.log(err);
              })

            })
            }  

            catch(error){  
              alert(error)  
            }
          
            return ()=>{isCancelled = true}


        }, [])


        const searchFilter = (text) =>{
          if(text){
            const newData = masterData.filter((item)=>{
              const itemData = item.CarnetName ? item.CarnetName.toUpperCase() : ''.toUpperCase()

              const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            });
            setFilterData(newData);
            setSearch(text);
          }
          else{
            setFilterData(masterData);
            setSearch(text);
          }
        }

        const getTotalCredit = () => {
          return masterData.reduce((total, item) => Number(item.total) + total, 0);
          };


  
    let [fontsLoaded] = useFonts({
        Inter_200ExtraLight,
        'BreeSerif-Regular': require('../../../assets/fonts/BreeSerif-Regular.ttf')
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      }
   
        return (
           <View style={styles.container}>
                <View style={styles.dash}>
                    <View style={styles.infoBoxWrapper}>
                      <View style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1
                      }]}>
                        <FontAwesome5 name="users" size={24} color="black" />
                        <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular'}}>{masterData.length}</Text> 
                    
                      </View>
                      <View style={styles.infoBox}>
                         <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', color: '#ff3838'}}>{masterData ? getTotalCredit() : 0} DH</Text>
                         <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular', }}>Crédit</Text> 
                      </View>
                  </View>
                 </View> 

                  
                
                <View style={{padding:20}}>
                  <Searchbar
                      style={{padding: 5, borderRadius: 50}}
                      placeholder="Search Here..."
                      value={search}
                      onChangeText={(text) => searchFilter(text)}
                    
                    />
                </View>

                 {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
                <FlatList
                
                  data = {filterData}
                  keyExtractor = {(item) => item._id}
                  renderItem = {({item}) => (
        
                <TouchableOpacity
                onPress = {()=> navigation.push("Details", {id : item._id})}
                >
                   <View 
                   style={{
                     
                       flexDirection:'row',
                       backgroundColor: '#FFF',
                       marginHorizontal: 20,
                       height: 'auto',
                       padding: 20,
                    
                       borderBottomColor: '#eee',
                       borderBottomWidth: 1,
                       justifyContent : 'space-between'
                       
                   }}
                   > 
                        <View style={{
                            flexDirection:"row", 
                            // backgroundColor:'red', 
                            width:200,
                            alignItems:'center'
                            }}>
                        {/* <Image source={require('../../../assets/img.jpg')} style={styles.image}></Image> */}
                        <View style={{width:60, backgroundColor:'#cde0f2', padding:20, borderRadius: 50, justifyContent:'center'}}>
                          <Text style={{textTransform: 'uppercase', fontFamily:'BreeSerif-Regular', color:'black'}}>{item.CarnetName.substr(0, 2)}</Text>
                        </View>
                        <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', marginLeft:10, color:'black'}}>{item.CarnetName.toUpperCase()}</Text>
                        </View>
                   
                          <Text style={{fontSize: 20, fontFamily:'BreeSerif-Regular', color:"#ff3838",textAlign: 'center'}}>{item.total} DH</Text>
                                
                    </View>
                </TouchableOpacity>
                    
                  )}
                />
                    
            
           
          </View>
        )
    
}


const styles = StyleSheet.create({
        container:{
          flex:1,
          backgroundColor: body,
        },

      dash: {
        backgroundColor: primary,
        height: Dimensions.get('window').width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },

    infoBoxWrapper: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor : button,
        padding: 20,
        flexDirection: 'row',
        height: 100,
    },
    
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  //  LineView:{
  //       backgroundColor:'black', 
  //       width:Dimensions.get('window').width*0.003, 
  //       height: Dimensions.get('window').width * 0.2,
  //  },
   image: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
  });


  export default Dashboard