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
      <Text
        style={{ position: 'absolute', 
        marginTop: Dimensions.get('window').height * 0.15,
        fontSize:20 }}>
        Wait for a moment......</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 200,
    paddingVertical: Dimensions.get('window').height * 0.15,
  },
  animation: {
    marginTop:35,
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').height * 0.5,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
});