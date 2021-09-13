import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
 
const WIDTH = Dimensions.get('window').width
export default class MyDatePicker extends Component {
   
  constructor(props){
    super(props)
    this.state = ''
  }
 
  render(){
    return (
      <DatePicker
        style={{width: '100%',backgroundColor: '#f5f6fa',
        marginVertical: 10,
        color: "#4b4b4b",
        fontWeight: 'bold',
        height: 50,
        borderRadius: 10,
        shadowColor: "rgba(200, 200, 200, 0.35)",
        borderColor: "rgba(171, 180, 189, 0.65)",}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        placeholderTextColor="#84817a"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 5,
            top: 8,
          
          },
          dateInput: {
           borderColor:'#f5f6fa',
           marginTop:10,
            
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}