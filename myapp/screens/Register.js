import React, { useState } from 'react';
import { Text, TextInput, View, Image, KeyboardAvoidingView } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { auth } from "../firebase/firebase-setup"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserToDB } from '../firebase/firestore';
import MainButton from '../components/UI/MainButton';
import Colors from '../constants/Color';
import { container, form } from '../constants/Style';
require('firebase/firestore');

export default function Register({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleRegister = async () => {
    if (username.length == 0 || email.length == 0 || password.length == 0) {
      setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
      return;
    }
    if (password.length < 6) {
      setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
      return;
    }
    if (password !== confirmpassword) {
      setIsValid({ bool: true, boolSnack: true, message: "the password and confirmed password don't match" })
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        username
      );
      createUserToDB({ username, email })
    } catch (err) {
      setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
      console.log(err);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={container.center}
    >

      <Image source={require('../assets/logo.png')} style={form.image} />
      <View style={container.formCenter}>
        <TextInput
          style={form.textInput}
          placeholder="Username"
          value={username}
          keyboardType="twitter"
          onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
        />
        <TextInput
          style={form.textInput}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={form.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={form.textInput}
          secureTextEntry={true}
          onChangeText={(newPass) => setConfirmPassword(newPass)}
          value={confirmpassword}
          placeholder="Confirm Password"
        />
        <MainButton
          style={form.button}
          onPress={handleRegister}>Register
        </MainButton>
        <View style={form.bottomButton} >
          <Text
            onPress={() => navigation.replace("Login")}
            style={{ color: Colors.darkBlack }}>
            Already have an account? SignIn.
          </Text>
        </View>
      </View>

      <Snackbar
        visible={isValid.boolSnack}
        duration={2000}
        onDismiss={() => { setIsValid({ boolSnack: false }) }}>
        {isValid.message}
      </Snackbar>
    </KeyboardAvoidingView>

  )
}