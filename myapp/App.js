import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Aboutme from "./components/UI/Aboutme";
import Main from "./components/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";
import Colors from "./constants/Color";
import Resultpage from "./screens/Resultpage";
import Loading from "./screens/Loading";
import { storeData, getItemFor } from "./helpers/storageHelper"

const Stack = createNativeStackNavigator()

const HAS_LAUNCHED = 'HAS_LAUNCHED';


export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const hasLaunched = await getItemFor(HAS_LAUNCHED);
      if (hasLaunched) {
        setHasLaunched(true)
      }
      else {
        await storeData(HAS_LAUNCHED, "true");
      }
    };
    getData().catch((err) => { console.log(err) })
  }, [])

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
          headerTintColor: Colors.darkBlack,
          headerTitleAlign: "center",
        }}
      >
        {!hasLaunched && <Stack.Screen name="Aboutme" component={Aboutme} options={{ headerShown: false }} />}
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
          headerTintColor: Colors.darkBlack,
          headerTitleAlign: "center",
        }} initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Loading" component={Loading} options={{ headerTitle: "Wait for a moment..." }} />
        <Stack.Screen name="Resultpage" component={Resultpage} options={{ headerTitle: "Dog Assessor" }} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}