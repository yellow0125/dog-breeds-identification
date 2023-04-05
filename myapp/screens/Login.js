import React, { useState } from 'react';
import { Text, TextInput, View, Alert, Image } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import MainButton from '../components/UI/MainButton';
import Colors from '../constants/Color';
import { container, form } from '../constants/Style';

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <View style={container.center}>
      {/* <Image source={require('../../assets/logo.png')} style={form.image} /> */}
      <View style={container.formCenter}>

        <TextInput
          style={form.textInput}
          placeholder="email"
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={form.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
        />
        <MainButton
          style={form.button}
          onPress={handleLogin}>Sign In
        </MainButton>
        <View style={form.bottomButton} >
          <Text
            title="Register"
            onPress={() => navigation.replace("Register")}
            style={{ color: Colors.White }} >
            Don't have an account? SignUp.
          </Text>
        </View>
      </View>
    </View>
  )
}