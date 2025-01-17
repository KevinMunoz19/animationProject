/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Animated,
  Text,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native';
import GlobalColors from '../utils/GlobalColors';
const Animation1 = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback(itemIndex => {
	ref?.current?.scrollToOffset({
		offset: itemIndex * width,
	});
  });
  const Tab = React.forwardRef(({item, onItemPress}, ref) => {
	  return (
		  <TouchableOpacity onPress={onItemPress}>
			<View ref={ref}>
			  	<Text style={{
				  color:'white',
				  fontSize: 84 / data.length,
				  fontWeight: '800',
				  textTransform: 'uppercase',
				}}>
			  		{item.title}
			  	</Text>
		  	</View>
		  </TouchableOpacity>
	  );
  });
	const Indicator = ({measures,scrollX}) => {
		  const inputRange = data.map((_, i) => i * width);
		  const indicatorWidth = scrollX.interpolate({
		  	inputRange,
		  	outputRange: measures.map((measure) => measure.width),
		  });
		  const translateX = scrollX.interpolate({
			inputRange,
			outputRange: measures.map((measure) => measure.x),
		});
		return (
			<Animated.View
				style={{
					position:'absolute',
					height:4,
					width:indicatorWidth,
					left:0,
					backgroundColor:'white',
					bottom: -10,
					transform: [{
						translateX,
					}],
				}}
			/>
		);
		};
  const Tabs = ({data, scrollX, onItemPress}) => {
	const [measures,setMeasures] = React.useState([]);
	const containerRef = React.useRef();
	  React.useEffect(()=>{
		const m = [];
		  data.forEach(item => {
			  	item.ref.current.measureLayout(
				  containerRef.current,
				  (x,y,width,height) => {
					m.push({
					x,
					y,
					width,
					height,
					});
					if (m.length === data.length){
						setMeasures(m);
					}
				  }
				);
		  });
	  }, []);
	  return (
		  <View style={{position:'absolute',top:100,width}}>
			  <View
			  	ref={containerRef}
			  	style={{
					  justifyContent:'space-evenly',
					  flex:1,
					  flexDirection:'row',
				  }}
			  >
				  {data.map((item, index) => {
					  return <Tab key = {item.key} item = {item} ref={item.ref} onItemPress={()=>{onItemPress(index);}}/>;
				  })}
			  </View>
			  	{measures.length > 0 && (
					<Indicator measures={measures} scrollX={scrollX}/>
				)}
		  </View>
	  );
  };
  const {width, height} = Dimensions.get('screen');
  const images = {
    man:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
      'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  };
  const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
	image: images[i],
	ref: React.createRef(),
  }));
  return (
    <View style={styles.container}>
      <Animated.FlatList
	  	ref = {ref}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
		onScroll={Animated.event(
			[{nativeEvent:{contentOffset: {x: scrollX}}}],
			{useNativeDriver: false}
		)}
        bounces={false}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.image}}
                style={{flex: 1, resizeMode: 'cover'}}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0,0.3)'},
                ]} />
            </View>
          );
        }}
      />
	  <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default Animation1;
