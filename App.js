/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Button,TouchableOpacity} from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations = ['DEL','+','-','*','/','%','C']
  }

  calculateResult() {
    const text = this.state.resultText
    console.log(text, eval(text))
    this.setState({
      calculationText: eval(text)
    })

  }

  validate() {
    const text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
               
           return false
    }return true
  }

  buttonPressed(text) {
     console.log(text)
     if(text == '=') {
       return  this.validate && this.calculateResult()
     }
     this.setState({
       resultText: this.state.resultText + text
     })
  }

  operate(operation) {
    switch(operation) {
            case 'DEL' :
                 const text = this.state.resultText.split('')
                 text.pop()
                 this.setState({
                   resultText: text.join('')
                 })
                 break
            case '+' :
            case '-' :
            case '*' :
            case '/' :
            case '%' :
            case 'C' :
                   const clearText = ""
                   this.setState({
                     calculationText: clearText,
                     resultText: clearText
                   })
                  const lastChar = this.state.resultText.split('').pop()

                  if(this.operations.indexOf(lastChar) > 0) return

                  if(this.state.text == "") return
                  this.setState({
                    resultText: this.state.resultText + operation
                  })

    }
  }

  render() {

    let rows= []
    let nums=[[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    //let num = 0
    for(let i=0;i<4;i++){
      let row = []
      for(let j=0;j<3;j++){
          row.push(
              <TouchableOpacity key={nums[i][j]} style={styles.btn} onPress={() => this.buttonPressed(nums[i][j])}>
                <Text style={styles.btnText}>{nums[i][j]}</Text>
              </TouchableOpacity>)
          }
          rows.push(<View key={i} style={styles.row}>{row}</View>)
      }
    
      
      let ops = []
      for(let i=0;i<=6;i++) {
          ops.push(<TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operations[i])}>
            <Text style={[styles.btnText, styles.violet]}>{this.operations[i]}</Text>
          </TouchableOpacity>)
      }

    return (
      <View style={styles.container}>
              <View style={styles.result}>
                 <Text style={styles.resultText}>{this.state.resultText}</Text>
              </View>
       
              <View style={styles.calculation}>
                 <Text style={styles.calculationText}>{this.state.calculationText}</Text>
              </View>
         
         <View style={styles.buttons}>
      
      
             <View style={styles.numbers}>
                {rows}
             </View>


            <View style={styles.operations}>
               {ops}
            </View>
         </View>
      </View>
    );
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'black'
  },
  result: {
    flex: 2,
    backgroundColor: 'ivory',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'normal'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'snow',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold'
  },
  buttons: {
   flex: 7,
   flexDirection: 'row',
  },
  btn:{
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },  
  btnText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  violet: {
    color: '#006442',
    fontWeight: 'normal'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'gainsboro',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'lightgrey'
  },
  
});
