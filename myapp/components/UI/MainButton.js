import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Color'

export default function MainButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        android_ripple={{ color: Colors.Grey, foreground: true }}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, (mode === 'negative') ? styles.flat : null, (mode === 'light') ? styles.lightButton : null]}>
          <Text style={[styles.buttonText, (mode === 'negative') ? styles.flatText : null, (mode === 'light') ? styles.lightButtonText : null]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: Colors.darkBlack
  },
  flat: {
    backgroundColor: Colors.LightGrey
  },
  buttonText: {
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  flatText: {
    color: Colors.Red,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
  lightButton: {
    borderRadius: 5,
    backgroundColor: Colors.BgDarkGreen,
  },
  lightButtonText: {
    color: Colors.White,
  },

});