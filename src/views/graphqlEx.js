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
import LoadingIndicator from '../components/LoadingIndicator';
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

const graphqlEx = () => {
    const {width, height} = Dimensions.get('screen');
    const { data, loading, error, networkStatus } = useQuery(
        FETCH_TODOS,
        {
            variables: { isPublic },
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        }
    );
    const [isPublic, setIsPublic] = React.useState(true);
    //const [text, setText] = React.useState('AAA');
    //const [insertTodo, { loadingInsert, errorInsert }] = useMutation(INSERT_TODO);
    //const [updateTodo, { loading: updating, error: updateError}] = useMutation(UPDATE_TODO);

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

    const UPDATE_TODO = gql`
        mutation ($id: Int, $isCompleted: Boolean) {
            update_todos (
                _set: {
                    is_completed: $isCompleted
                },
                where: {
                    id: {
                        _eq: $id
                    }
                }
            ) {
                returning {
                    id
                    title
                    is_completed
                    created_at
                    is_public
                }
            }
        }
    `;

    const REMOVE_TODO = gql`
        mutation ($id: Int) {
            delete_todos(
                where: {
                    id: {
                        _eq: $id
                    }
                }
            ) {
                affected_rows
            }
        }
    `;

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
    const updateCheck = () => {
        const update = () => {
            if (updating) return;
            updateTodo({
                variables: {
                    id: item.id,
                    isCompleted: !item.is_completed
                }
            });
        }
    }
    const deleteButton = () => {
        const updateCache = (client) => {
            const data = client.readQuery({
                query: FETCH_TODOS,
                variables: {
                    isPublic,
                }
            });
            const newData = {
                todos: data.todos.filter((t) => t.id !== item.id)
            }
            client.writeQuery({
                query: FETCH_TODOS,
                variables: {
                    isPublic,
                },
                data: newData
            });
        }
        const remove = () => {
            if (deleting) return;
            deleteTodo({
                variables: {id: item.id},
                update: updateCache
            });
        };
    }

    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

    const BG_IMG = 'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200';
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const [insertTodo, { loadingInsert, errorInsert }] = useMutation(INSERT_TODO);
    const [updateTodo, { loading: updating, error: updateError}] = useMutation(UPDATE_TODO);
    const [deleteTodo, {loading: deleting, error: deleteError}] = useMutation(REMOVE_TODO);

    

    

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Image
                source = {{ uri: BG_IMG }}
                style = {StyleSheet.absoluteFillObject}
                blurRadius = {20}
            />
            {(!data) && (
                <View style={{...styles.bodyContainer,width:width,height:height*0.95}}>
                    <LoadingIndicator
                        width = {width}
                        height = {25}
                        size = {250}
                        color = 'rgb(204,0,204)'
                    />
                </View>
                
            )}
            {(data) &&( 
            <View style={{...styles.bodyContainer,width:width,height:height*0.95}}>
                <Animated.FlatList
                    data = {data.todos}
                    showsVerticalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id.toString()}
                    onScroll = {Animated.event(
                        [{ nativeEvent : {contentOffset: {y:scrollY}}}],
                        { useNativeDriver: true }
                    )}
                    contentContainerStyle = {{
                        padding: SPACING,
                        paddingTop: StatusBar.currentHeight || 42
                    }}
                    renderItem = {({item,index}) => {
                        const inputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 2)
                        ]
                        const opacityInputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 0.5)
                        ]
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange:[1,1,1,0]
                        })
                        const opacity = scrollY.interpolate({
                            inputRange: opacityInputRange,
                            outputRange:[1,1,1,0]
                        })
                        return <TouchableOpacity>
                            <Animated.View style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor:item.is_completed?"green":"red", borderRadius:12,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 5
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 10,
                                    opacity,
                                    transform: [{scale}]
                                }}>
                                <View>
                                    <Text style = {{fontSize: 22, fontWeight: '700'}}>
                                        {item.title}
                                    </Text>
                                    <Text style = {{fontSize: 18, opacity: .7}}>
                                        {item.created_at.substring(0,19).replace("T"," ")}
                                    </Text>
                                    <Text style = {{fontSize: 14, opacity: .8, color: '#0099cc'}}>
                                        {item.user.name}
                                    </Text>
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    }}
                />
                 
                <TouchableOpacity style={styles.sendButton} onPress={() => Actions.gqladd()}>
                    <Text style = {{fontSize:18, fontWeight:'500', color:'white'}}>
                        Add New TODO
                    </Text>
                </TouchableOpacity>
            </View>
            )}       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        //marginTop:20,
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
        //padding:8,
        justifyContent:"center",
        alignItems:"center",
    },
});

export default graphqlEx;
