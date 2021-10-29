import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview';



const Support = ()=>{

    return (
        <View style={styles.container}>
           {/* http://10.0.2.2:7000 */}
            <WebView
                source={{ uri: "https://carnet-web-app.herokuapp.com/contact" }}
            />
         
        </View>
    )
}


export default Support





const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center'
    }
})