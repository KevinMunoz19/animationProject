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

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';


export default class LoadingIndicator extends React.PureComponent {
  render() {
    return(
        <View style={{backgroundColor:'transparent', width:this.props.width, height:this.props.height, flexDirection:'row', justifyContent:'space-around'}}>
            <PacmanIndicator color='white' size={this.props.size} color = {this.props.color} />
        </View>
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
