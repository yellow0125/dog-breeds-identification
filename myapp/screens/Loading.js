import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/dog-anima.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal:200,
    paddingVertical:Dimensions.get('window').height *0.18,
  },
  animation: {
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').height *0.5,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
});