import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Button, } from 'react-native'
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';
import { Colors } from '../../Component/Style';
  const {primary, button, body} = Colors

  const  Dashboard = ({navigation})=> {
 
        const [masterData, setMasterData] = useState([])
        const [filterData, setFilterData] = useState([])
        const [search, setSearch] = useState('')
        
        useEffect(()=>{
              
            const url = 'http://10.0.2.2:7000/Carnet/carnetbyepicier/'

            try{  
            navigation.addListener('focus', async()=>{
              let user = await AsyncStorage.getItem('user'); 
              // let token = await AsyncStorage.getItem('token'); 
              // console.log(token);
              let parsed = JSON.parse(user);  
              const id = parsed._id

              await axios.get(url + id)
              .then(response=>{
                // console.log("hadi hiya data:", {...data[0]})
                setFilterData(response.data.carnet)
                setMasterData(response.data.carnet)
                
              }).catch(err=>{
                console.log(err);
              })

            })
            }  

            catch(error){  
              alert(error)  
            }
          
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
                         <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', color: '#3ae374'}}>1000 DH</Text>
                         <Text style={{textAlign:"center", fontFamily:'BreeSerif-Regular', }}>######</Text> 
                    
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
                onPress = {()=> navigation.push("Details", {Carnet : item})}
                >
                   <View 
                   style={{
                     
                       flexDirection:'row',
                       backgroundColor: '#FFF',
                       marginHorizontal: 20,
                       height: Dimensions.get('window').width*0.13,
                       padding: 20,
                       borderBottomColor: '#eee',
                       borderBottomWidth: 1,
                       justifyContent: "space-between",
                       
                       
                      
                   }}
                   > 
                        <View style={{
                            flexDirection:"row", 
                            // backgroundColor:'red', 
                            width:200,
                            alignItems:'center'
                            }}>
                        <Image source={require('../../../assets/img.jpg')} style={styles.image}></Image>
                        <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', marginLeft:10, color:'black'}}>{item.CarnetName.toUpperCase()}</Text>
                        </View>
                   
                          <Text style={{fontSize: 20, fontFamily:'BreeSerif-Regular', color:"#ff3838",marginTop:5}}>{item.total} DH</Text>
                                
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
      // borderBottomWidth: 1,
      // borderBottomColor: 'red',
      // borderTopColor: 'red',
      // borderTopWidth: 1,
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