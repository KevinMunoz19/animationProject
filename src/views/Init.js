import React, { useState, useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ImageBackground,
	ActivityIndicator,
	NativeModules,
	NativeEventEmitter,
}	from 'react-native';

import GlobalColors from '../utils/GlobalColors';

const Init = () => {
	const [loading,setLoading] = useState(false);

  return (
    <View style={styles.container}>
			{loading && (
				<View style={styles.loaderContainer}>
					<ActivityIndicator visible={false} size='large' />
					<Text allowFontScaling={false}>Cargando...</Text>
				</View>
			)}
			{!loading && (
        <View style={styles.textHeaderContainer}>
          <Text style={{ ...styles.textHeader, fontSize:30}} allowFontScaling={false}>Animation API Showcase</Text>
        </View>
			)}
      <React.Fragment>
					<TouchableOpacity style={styles.sendButton} onPress={() => Actions.home()}>
            <Text style={{textAlign:'center', fontSize:25}} allowFontScaling={false}>Go</Text>
          </TouchableOpacity>
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: GlobalColors.PrimaryColor,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
	sendButton:{
		backgroundColor:'white',
		width:'45%',
		height:'9%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
		borderRadius:15,
		borderBottomRightRadius:30,
		marginBottom:60,
	},
	textHeader:{
    color:'white',
    fontSize:25,
  },
  textHeaderContainer:{
    width:'70%',
    height:'20%',
		alignItems:'center',
    justifyContent:'center',
		marginTop: 10,
		marginBottom: 30
  },

});

export default Init;
