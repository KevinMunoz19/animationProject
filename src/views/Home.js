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
} from 'react-native';

import GlobalColors from '../utils/GlobalColors';

const Home = () => {
  return (
    <View style={styles.container}>
      <React.Fragment>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => Actions.a1()}>
          <Text
            style={{textAlign: 'center', fontSize: 12}}
            allowFontScaling={false}>
            Animated tabs & indicator
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => Actions.a2()}
        >
          <Text
            style={{textAlign: 'center', fontSize: 12}}
            allowFontScaling={false}>
            FlatList Carousel Animation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => Actions.a3()}
        >
          <Text
            style={{textAlign: 'center', fontSize: 12}}
            allowFontScaling={false}>
            Parallax Carousel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => Actions.a4()}
        >
          <Text
            style={{textAlign: 'center', fontSize: 12}}
            allowFontScaling={false}>
            Timer Animation
          </Text>
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

export default Home;
