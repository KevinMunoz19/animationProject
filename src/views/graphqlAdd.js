/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
  Animated,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FormInput from '../components/FormInput';
import FormPicker from '../components/FormPicker';
import ButtonCustom from '../components/ButtonCustom';

import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NetworkStatus } from '@apollo/client';
//import gql from 'graphql-tag';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import {Picker} from '@react-native-picker/picker';

const FETCH_TODOS = gql`
    query ($isPublic: Boolean) {
        todos (
            order_by: {
                created_at: desc
            },
            where: { is_public: { _eq:$isPublic} },
            limit: 10
        ){
            id
            title
            is_completed
            created_at
            is_public
            user {
                name
            }
        }
    }
`;
const INSERT_TODO = gql`
    mutation ($text: String!, $booleanPublic: Boolean){
        insert_todos (
            objects: [{
                title: $text,
                is_public: $booleanPublic
            }]
        ){
            returning {
                id
                title
                is_completed
                created_at
                is_public
                user {
                    name
                }
            }
        }
    }
`;



const GraphqlAdd = () => {
    const [insertTodo, { data ,loading, errorInsert }] = useMutation(INSERT_TODO);
    const {width, height} = Dimensions.get('screen');
    const [isPublic, setIsPublic] = React.useState(true);
    const [text, setText] = React.useState('');
    const [isPublicForm, setIsPublicForm] = React.useState("");
    //const [updateTodo, { loading: updating, error: updateError}] = useMutation(UPDATE_TODO);
    const submit = () => {
        var booleanPublic = isPublicForm == "t"?true:false;
        //const booleanPublic = true;
        insertTodo({
            variables: { text, booleanPublic },
            //update: updateCache
        });
    }; 

    //data?Actions.home():setCounter(1);

    const updateCache = (client, {data:{insert_todos}}) => {
        const data = client.readQuery({
            query: FETCH_TODOS,
            variables: {
                isPublic,
            }
        });
        const newTodo = insert_todos.returning[0];
        const newData = {
            todos: [ newTodo, ...data.todos ]
        }
        client.writeQuery({
            query: FETCH_TODOS,
            variables: {
                isPublic,
            },
            data: newData
        });
    }

    return (
        <View style={styles.container}>
            <View style={{flex:2, backgroundColor:'transparent', width, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'500'}}>Add new TODO</Text>
            </View>
            <View style={{flex:2, backgroundColor:'transparent',width}}>
                <FormInput 
                    formWidth={width} 
                    flexValueTitle={1} 
                    flexValueInput={3} 
                    titleValue={"TODO Title"} 
                    placeholderValue={"Enter title for TODO"}
                    onChangeText={(e)=>setText(e)}
                    inputBorderColor={text==""?'purple':'green'}
                    sensitiveContent={false}
                    textInputValue={text}
                />
            </View>
            <View style={{flex:2, backgroundColor:'transparent',width}}>
                <FormPicker
                    width = {width}
                    flexValueTitle={1} 
                    flexValueInput={5} 
                    pickerOptions = {["Private|f","Public|t"]}
                    titleValue={"TODO Visibility"} 
                    onChangePick={(itemValue, itemIndex) => setIsPublicForm(itemValue)}
                    selectedPick = {isPublicForm}
                />
            </View>
            <View style={{flex:2, backgroundColor:'transparent',width, justifyContent:'center',alignItems:'center'}}>
                <ButtonCustom
                    width = {width/2}
                    height = {80}
                    onPress = {() => submit()}
                    buttonText = {"Add"}
                    bgColor = {text==""?'purple':'green'}
                    isDisabled = {text==""?true:false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    backgroundColor: 'blue',
    width: '45%',
    height: '6%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderBottomRightRadius: 30,
    marginTop:20,
    //marginBottom: 60,
  },
  itemTitleContainer: {
    backgroundColor: 'transparent',
    justifyContent:'center',
		alignItems:'center',
    flex:1,
  },
  itemTitle: {
    fontSize: 10,
		color:'white',
  },
    bodyContainer: {
        backgroundColor: "transparent",
        padding:8,
        justifyContent:"center",
        alignItems:"center",
    },
});

export default GraphqlAdd;

