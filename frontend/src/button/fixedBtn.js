import React, { Children, Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default function fixedBtn ({Children}) {
    
        return (
            <View style={styles.container}>
                {Children && React.cloneElement(Children, {style: styles.btn})}
            </View>
        )
    
}


const styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20, 
        height: 80
     
    },
    btn: {
        height: '100%',
        justifyContent:'center'
    }
 
  });


