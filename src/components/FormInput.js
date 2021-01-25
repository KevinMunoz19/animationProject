import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ImageBackground,
	ActivityIndicator,
  Alert,
	Dimensions,
    FlatList,
    TextInput,
}	from 'react-native';


export default class FormInput extends React.PureComponent {
  render() {
    return(
        <View style={{flex:this.props.flexValueTitle, backgroundColor:'transparent', width:this.props.formWidth}}>
            <View style={{flex:1, backgroundColor:'transparent', width:this.props.formWidth, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15, fontWeight:'500'}}>{this.props.titleValue}</Text>
            </View>    
        <View style={{flex:this.props.flexValueInput, backgroundColor:'transparent', width:this.props.formWidth, justifyContent:'center',alignItems:'center'}}>
            <TextInput
                editable={true}
                placeholder={this.props.placeholderValue}
                style = {{backgroundColor:'transparent', width:'80%', height:50,borderColor:this.props.inputBorderColor, borderWidth:2, borderRadius:8}}
                onChangeText = {this.props.onChangeText}
                secureTextEntry = {this.props.sensitiveContent}
                value={this.props.textInputValue}
            />
        </View> 
    </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    height:260,
    width:125,
    backgroundColor: 'red',
    justifyContent:'center',
		alignItems:'center',
    flex:1,
    marginHorizontal: 4,
		borderRadius:20,
		padding:10,
  },
  itemImage: {
    backgroundColor: 'red',
    justifyContent:'center',
		alignItems:'center',
    flex:6,

  },
  itemRating: {
    backgroundColor: 'blue',
    justifyContent:'center',
		alignItems:'center',
    flex:0.5,
  },
  itemTitleContainer: {
    backgroundColor: 'transparent',
    justifyContent:'center',
		alignItems:'center',
    flex:1,
  },
  itemTitle: {
    fontSize: 20,
		color:'green',
		fontFamily:"Dosis-Regular",
  },
  tinyLogo: {
    width: 100,
    height: 180,
    borderRadius:10,
  }
})
