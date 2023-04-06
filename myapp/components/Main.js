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
            headerTintColor: Colors.darkBlack,
            tabBarStyle: { backgroundColor: Colors.BgDarkGreen },
            tabBarInactiveTintColor: Colors.darkGrey,
            tabBarActiveTintColor: Colors.Orange,
            headerTitleAlign: 'center',
          }
        }}
        initialRouteName="Homepage"
      >
        <Tab.Screen name="Scanner" component={Homepage}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="camera" size={size} color={color} />,
            headerTitle: "Dog Assessor",
          }}
        />
        <Tab.Screen name="Record" component={Recordpage}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="heart" size={size} color={color} />,
            headerTitle: "Search history",
          }}
        />
        <Tab.Screen name="Profile" component={Userpage}
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
