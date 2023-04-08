import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loading({ modal }) {
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
        marginTop: Dimensions.get('window').height * 0.68,
        fontSize:17 }}>
        Wait for a moment......</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 200,
    paddingVertical: Dimensions.get('window').height * 0.15,
  },
  animation: {
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').height * 0.5,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
});