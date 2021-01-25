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
import {Picker} from '@react-native-picker/picker';


export default class FormPicker extends React.PureComponent {
  render() {
    return(
        <View style={{flex:this.props.flexValueTitle, backgroundColor:'transparent', width:this.props.formWidth}}>
            <View style={{flex:1, backgroundColor:'transparent', width:this.props.formWidth, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15, fontWeight:'500'}}>{this.props.titleValue}</Text>
            </View>    
        <View style={{flex:this.props.flexValueInput, backgroundColor:'transparent', width:this.props.formWidth}}>
            <Picker
                onValueChange = {this.props.onChangePick}
                selectedValue = {this.props.selectedPick}
            >
              {this.props.pickerOptions.map((item,i)=>{
								var itemString = item.toString().trim();
								var arrayItem = itemString.split("|");
									return(
											<Picker.Item key={i} label= {arrayItem[0]} value={arrayItem[1]} color={'black'} fontSize={5}  />
									)
							})}
            </Picker>

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
