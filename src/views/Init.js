/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import GlobalColors from '../utils/GlobalColors';
const Init = () => {
  const BG_IMG =
    'https://cdn.dribbble.com/users/3281732/screenshots/10439348/media/b0ca2c70dd9890d1cff6ce721981f495.jpg?compress=1&resize=1200x1200';
  const [duration, setDuration] = React.useState(5);
  const viewAnimation = React.useRef(new Animated.Value(0)).current;
  const animation = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(viewAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Actions.ahome();
      Animated.timing(viewAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const translateY = viewAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 600],
  });

  React.useEffect(() => {
    //Actions.ahome()
    //Actions.gqladd()
    //Actions.ahome()
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={4}
      />
      <Animated.View
        style={
          (styles.textHeaderContainer,
          {
            transform: [
              {
                translateY,
              },
            ],
          })
        }>
        <Text
          style={{
            ...styles.textHeader,
            fontSize: 50,
            fontWeight: '600',
          }}
          allowFontScaling={false}>
          React Native Showcase
        </Text>
      </Animated.View>
      <TouchableOpacity style={styles.sendButton} onPress={animation}>
        <Text
          style={{textAlign: 'center', fontSize: 25}}
          allowFontScaling={false}>
          Go
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'orange',
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

export default Init;
