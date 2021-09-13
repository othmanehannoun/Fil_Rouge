import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'

function Login (){
    
        return (
            <View style={styles.container}>
                 <Image
                    style={styles.tinyLogo}
                    source={require('../assets/Vecteur.png')}
                    resizeMode="contain"
                />

                <Text style={{fontSize:40, fontWeight:"bold"}}> Bonjour!</Text>
                <Text style={{fontSize:16, color:"gray", textAlign:'center', marginHorizontal:20}}>
                    La meilleure application de livre de compte digital et 100% gratuite
                </Text>

                <View style={{flexDirection: 'row', paddingVertical:20}}>
                <TouchableOpacity 
                style={{
                    backgroundColor:"#000AFF",
                    padding:10,
                    width: 150,
                    borderRadius:20,
                    marginHorizontal:20
                    
                }}
                >
                    <Text style={{textAlign:'center', color:"#fff", fontSize:18}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{
                    
                    backgroundColor:"#FFF",
                    padding:10,
                    width: 150,
                    borderRadius:20,
                    borderColor: "#000AFF",
                    borderWidth:1,
                    marginHorizontal:20
                    
                }}
                >
                    <Text style={{textAlign:'center', color:"#000AFF", fontSize:15}}>Sign Up</Text>
                </TouchableOpacity>
                </View>

                <Text>notre via les réseaux sociaux</Text>

                <View style={{flexDirection:"row", marginTop:40}}>
              

                <TouchableOpacity 
                style={{
                    backgroundColor:"#000AFF",
                    padding:10,
                    width: 55,
                    borderRadius:50,
                    marginHorizontal:20
                    
                }}
                >
                    <Text style={{textAlign:'center', color:"#fff", fontSize:25, fontWeight:"bold"}}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{
                    backgroundColor:"#FF000F",
                    padding:10,
                    width: 55,
                    borderRadius:50,
                    marginHorizontal:20
                    
                }}
                >
                    <Text style={{textAlign:'center', color:"#fff", fontSize:25, fontWeight:"bold"}}>G</Text>
                </TouchableOpacity>
               
                </View>
            </View>
        )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 400,
    height: 400,
  },
});

export default Login
