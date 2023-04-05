import React from 'react'
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from "../constants/Color";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from "../screens/Homepage";
import Userpage from "../screens/Userpage";
import Recordpage from '../screens/Recordpage';
// import LocateMe from './UI/LocateMe';

const Tab = createBottomTabNavigator();
export default function Main() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation, route }) => {
          return {
            headerStyle: { backgroundColor: Colors.BgDarkGreen },
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: Colors.BgDarkGreen },
            tabBarInactiveTintColor: Colors.White,
            tabBarActiveTintColor: Colors.BgLighterYellow,
            headerTitleAlign: 'center',
          }
        }}
        initialRouteName="Homepage"
      >
        <Tab.Screen name="Homepage" component={Homepage}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />,
            headerTitle: "Fooriend",
          }}
        />
        <Tab.Screen name="Recordpage" component={Recordpage}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="heart" size={size} color={color} />,
            headerTitle: "Search history",
          }}
        />
        <Tab.Screen name="Userpage" component={Userpage}
          options={({ navigation }) => {
            return {
              tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
              headerTitle: "My Profile",
            }
          }}
        />
      </Tab.Navigator>
    )
  }
