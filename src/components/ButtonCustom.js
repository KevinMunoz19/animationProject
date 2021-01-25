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


export default class ButtonCustom extends React.PureComponent {
  render() {
    return(
            <TouchableOpacity style={{...styles.sendButton, width:this.props.width, height:this.props.height, backgroundColor:this.props.bgColor, opacity:this.props.isDisabled?0.5:1}} onPress={this.props.onPress} disabled={this.props.isDisabled}>
                <Text style = {{fontSize:18, fontWeight:'500', color:'white'}}>
                    {this.props.buttonText}
                </Text>
            </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    sendButton: {
        backgroundColor: 'blue',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderBottomRightRadius: 30,
        //marginTop:20,
        //marginBottom: 60,
    },
})
