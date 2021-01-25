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
    Image,
    ImageBackground,
    ActivityIndicator,
    NativeModules,
    NativeEventEmitter,
    StatusBar,
    FlatList,
    Animated,
    Dimensions,
    Easing,
    SafeAreaViewBase,
    SafeAreaView
}	from 'react-native';

import GlobalColors from '../utils/GlobalColors';
import faker from 'faker';



const AnimatedHome = () => {
    faker.seed(10);
    const DATA = [...Array(30).keys()].map((_, i) => {
        return {
            key: faker.random.uuid(),
            image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
            name: faker.name.findName(),
            jobTitle: faker.name.jobTitle(),
            email: faker.internet.email(),
        };
    });

    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

    const BG_IMG = 'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200';
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar hidden/>
            <Image
                source = {{ uri: BG_IMG }}
                style = {StyleSheet.absoluteFillObject}
                blurRadius = {20}
            />
            <Animated.FlatList
                data = {DATA}
                keyExtractor = {(item) => item.key}
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
                    return <Animated.View style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor:'white', borderRadius:12,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 10
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            opacity,
                            transform: [{scale}]
                        }}>
                        <Image
                            source = {{uri: item.image}}
                            style = {{ width: AVATAR_SIZE, height:AVATAR_SIZE, borderRadius:AVATAR_SIZE, marginRight: SPACING/2}}
                        />
                        <View>
                            <Text style = {{fontSize: 22, fontWeight: '700'}}>
                                {item.name}
                            </Text>
                            <Text style = {{fontSize: 18, opacity: .7}}>
                                {item.jobTitle}
                            </Text>
                            <Text style = {{fontSize: 14, opacity: .8, color: '#0099cc'}}>
                                {item.email}
                            </Text>
                        </View>
                    </Animated.View>
                }}
            />
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
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sendButton: {
    backgroundColor: 'white',
    width: '45%',
    height: '9%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderBottomRightRadius: 30,
    marginBottom: 60,
  },
  textHeader: {
    color: 'white',
    fontSize: 25,
  },
  textHeaderContainer: {
    width: '70%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
});

export default AnimatedHome;
