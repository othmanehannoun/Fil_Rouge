import React from 'react'
import { Text, TouchableOpacity, Dimensions  } from 'react-native'
import { Colors } from '../Component/Style';
const {primary, button} = Colors
export default function Button(props){
    
        return (
            <TouchableOpacity 
                        onPress={props.onPressFunction}      
                        style={{
                            backgroundColor: button,
                            padding:10,
                            height: 55,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: Dimensions.get('window').width * 0.05,
                                    
                        }}

                        >
                          <Text style={{fontFamily:'BreeSerif-Regular', fontSize: 20, color: "#FFF"}}>{props.title}</Text>
                </TouchableOpacity>
        )
    
}


