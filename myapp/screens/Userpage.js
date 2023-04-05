import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image, } from 'react-native';
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { firestore, auth } from '../firebase/firebase-setup';
import { useRoute } from "@react-navigation/native";
import { saveUser } from '../firebase/firestore';
import Color from "../constants/Color";
import { TouchableHighlight } from 'react-native';
import Row from "../components/UI/Row";
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function Userpage() {
  const [userData, setUserData] = useState([]);
  const route = useRoute();
  const userLocation = userData.location
  const [location, setLocation] = useState(userLocation);
  const [country, setCountry] = useState(userData.country)
  const [isLoading, setIsLoading] = useState(false);
  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);
  const [pressed, setPressed] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(
      doc(firestore, "users", auth.currentUser.uid), (doc) => {
        let data = doc.data();
        data = { ...data, key: doc.id };
        setUserData(data);
        setIsLoading(false)
      }
    );
    return () => {
      unsubscribe();
      setIsLoading(false)
    };
  }, []);
  return (
    <>
      <View>
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.userInfo}>{auth.currentUser.email}</Text>
        <Text style={styles.userInfo}>{userData.gender}</Text>
        <Text style={styles.userInfo}>{userData.country}</Text>
      </View>
      <TouchableHighlight
        underlayColor={Color.LightGrey}
        onPress={() => signOut(auth)}
      >
        <View>
          <Row style={styles.icon}>
            <Feather
              name="log-out"
              size={30}
              color={Color.Black}
            />
          </Row>
          <Row><Text>Click to Logout</Text></Row>
        </View>
      </TouchableHighlight>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width * 0.3 / 2,
    borderWidth: 2,
    borderColor: Color.BgDarkGreen,
    overflow: "hidden",
    marginVertical: Dimensions.get('window').height / 30,
    marginHorizontal: Dimensions.get('window').width / 30,
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer2: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.22,
  },
  userContainer: {
    marginVertical: Dimensions.get('window').height / 21,
    marginHorizontal: Dimensions.get('window').width / 10,

  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 5

  },
  userInfo: {
    color: Color.Grey,
    fontSize: 14,

  },
  iconContainer: {
    justifyContent: 'space-between',
  },
  icon: {
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttonsContainer: {
    justifyContent: 'center',
    margin: 10,
  },
  buttons: {
    marginHorizontal: 8,
    minWidth: 100,
  },
  part: {
    marginVertical: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: Color.White,
    borderRadius: 5,
    elevation: 8,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5
  },

  text: {
    fontSize: 18,
    color: Color.Black,
    alignSelf: 'center',
  },
})