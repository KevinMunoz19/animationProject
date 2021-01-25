/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Actions} from 'react-native-router-flux';
import { StatusBar,
    Animated,
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
import ButtonCustom from '../components/ButtonCustom';
const bgs = ['#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "111",
    "title": "Animation API",
    "description": "Various animation examples, including flatlist and view animation.",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571747.png",
    "actionKey":0
  },
  {
    "key": "112",
    "title": "GraphQL TODO example",
    "description": "GraphQL example of TODO list using hasura.io, including queries and mutations.",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571680.png",
    "actionKey":1
  }
]
const Indicator = ({scrollX}) => {
  return <View style = {{position:'absolute', bottom:100, flexDirection:'row'}}>
      {DATA.map((_,i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.9, 0.4],
          extrapolate: 'clamp',
        });
        return <Animated.View
          key={`indicator-${i}`}
          style={{
            height:10,
            width:10,
            borderRadius:5,
            backgroundColor:'#fff',
            opacity,
            margin:10,
            transform: [
              {
                scale,
              },
            ],
          }}
        />;
      })}
    </View>;
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_,i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style = {[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const goToAction = (itemActionKey) => {
    switch (itemActionKey) {
        case 0:
          Actions.home();
          break;
        case 1:
            Actions.gqlex();
          break;
        default:
            Actions.home();
      }
}

const {width, height} = Dimensions.get('screen');

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, width),
      new Animated.Value(width)
    ),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0,0.5,1],
    outputRange: ['35deg','0deg','35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0,0.5,1],
    outputRange: [0,-height,0],
  })

  return <Animated.View
    style ={{
      width: height,
      height: height,
      backgroundColor: '#fff',
      borderRadius: 86,
      position: 'absolute',
      top: -height * 0.6,
      left: -height * 0.3,
      transform: [
        {
          rotate,
        },
        {
          translateX,
        },
      ],
    }}
  />;
};

const Animation2 = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent:{contentOffset:{x:scrollX}}}],
          {useNativeDriver: false}
        )}
        contentContainerStyle = {{paddingBottom:100}}
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        renderItem = {({item}) => {
          return (
            <View
              style ={{
                width,
                alignItems: 'center',
                padding: 20,
              }}
            >
              <View
                style ={{
                  flex:0.7,
                  justifyContent: 'center',
                }}
              >
                <Image
                  source = {{uri: item.image}}
                  style = {{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                    }}
                />
              </View>
              <View style={{flex:0.3}}>
                <Text
                  style = {{
                    fontWeight:'800',
                    fontSize:28,
                    marginBottom:10,
                    color:'#fff',
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style = {{ fontWeight:'300',
                  fontSize:20,
                  marginBottom:10,
                  color:'#fff',
                }}
                >
                  {item.description}
                </Text>
                <ButtonCustom
                    width = {width/2}
                    height = {60}
                    buttonText = {"Go"}
                    bgColor = {'purple'}
                    isDisabled = {false}
                    onPress = {() => goToAction(item.actionKey)}
                />
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX}/>
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

});

export default Animation2;
