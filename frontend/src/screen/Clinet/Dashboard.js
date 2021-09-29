import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {Data} from "./Data";
import { Searchbar } from 'react-native-paper';

import axios from 'axios'
import { Colors } from '../../Component/Style';
const {primary} = Colors




import AppLoading from 'expo-app-loading';
import { 
  useFonts, 
  Inter_200ExtraLight,
  
  } from '@expo-google-fonts/inter';



  const  DashboardCnt = ({navigation})=> {
 

    const [masterData, setMasterData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState('')

  useEffect(()=>{
    
    const fetchData = async()=>{
      
      const url = 'http://10.0.2.2:7000/Carnet/carnetbyclient/'


      try{  
       navigation.addListener('focus', async()=>{
        let user = await AsyncStorage.getItem('user'); 
        let parsed = JSON.parse(user);  
        const id = parsed._id
        // console.log(id);

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
    
    }
    fetchData();
    
    return () =>{
          
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
                style={{}}
                  data = {filterData}
                  keyExtractor = {(item) => item._id}
                  renderItem = {({item}) => (
        
                <TouchableOpacity
                onPress = {()=> navigation.push("DetailsCnt", {Carnet : item})}
                >
                   <View 
                   style={{
                     
                    flexDirection:'row',
                    backgroundColor: '#FFF',
                    marginHorizontal: 20,
                    height: 'auto',
                    padding: 20,
                    borderRadius : 10, 
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
                        <Text style={{fontSize:20, fontFamily:'BreeSerif-Regular', marginLeft:10, color:'black'}}>{item.InfoEpicier.toUpperCase()}</Text>
                        </View>
                   
                          <Text style={{fontSize: 20, fontFamily:'BreeSerif-Regular', color:"#ff3838"}}>{item.total} DH</Text>
                                
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
          backgroundColor:"#F5FDFF",
        },

        dash: {
        backgroundColor: primary,
        height: Dimensions.get('window').width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
  //  table: {
  //      flexDirection: 'row',
  //      height: Dimensions.get('window').width * 0.3,
  //      backgroundColor: '#fff',
  //      width: Dimensions.get('window').width * 0.9,
  //      alignItems: 'center',
  //      justifyContent: 'space-between',
  //      padding: Dimensions.get('window').width * 0.14
  //  },
        infoBoxWrapper: {
          backgroundColor: "#FFF",
          borderBottomColor: 'red',
          borderBottomWidth: 1,
          borderTopColor: 'red',
          borderTopWidth: 1,
          padding: 20,
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
  });


export default DashboardCnt;