import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./screens/Homepage";
import Userpage from "./screens/Userpage";
import Main from "./components/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";
import Colors from "./constants/Color";

const Stack = createNativeStackNavigator()

const HAS_LAUNCHED = 'HAS_LAUNCHED';


export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });
  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.BgDarkGreen },
          headerTintColor: Colors.White,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: "Log in your account" }} />
        <Stack.Screen name="Register" component={Register} options={{ headerTitle: "Create a new account" }} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.BgDarkGreen },
          headerTintColor: Colors.White,
          headerTitleAlign: "center",
        }} initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerTitle: "Dog Assessor" }} />
        <Stack.Screen name="Userpage" component={Userpage} options={{ headerTitle: "My Recipes" }} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}