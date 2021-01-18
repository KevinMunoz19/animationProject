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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NetworkStatus } from '@apollo/client';
//import gql from 'graphql-tag';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';

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
    mutation ($text: String!, $isPublic: Boolean){
        insert_todos (
            objects: [{
                title: $text,
                is_public: $isPublic
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



const graphqlAdd = () => {
    const [insertTodo, { loadingInsert, errorInsert }] = useMutation(INSERT_TODO);
    const {width, height} = Dimensions.get('screen');
    const [isPublic, setIsPublic] = React.useState(true);
    const [text, setText] = React.useState('AAA');
    //const [insertTodo, { loadingInsert, errorInsert }] = useMutation(INSERT_TODO);
    //const [updateTodo, { loading: updating, error: updateError}] = useMutation(UPDATE_TODO);
    
    

    const submit = () => {
        insertTodo({
            variables: { text, isPublic },
            update: updateCache
        });
    }; 

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
            <View style={{...styles.bodyContainer,width:width,height:height*0.9}}>
                <Text>
                    AAA
                </Text>
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
  item: {
    height:120,
    width:250,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    marginVertical: 8,
    borderRadius:20,
    padding:10,
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

export default graphqlAdd;
