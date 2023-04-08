import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, } from 'react-native';
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { firestore, auth } from '../firebase/firebase-setup';
import { useRoute } from "@react-navigation/native";
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
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/user.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.userInfo}>{auth.currentUser.email}</Text>
        <Text style={styles.userInfo}>{userData.gender}</Text>
        <Text style={styles.userInfo}>{userData.country}</Text>
      </View>
      <Row style={[styles.iconContainer, styles.part]}>   
                    <TouchableHighlight
                        underlayColor={Color.LightGrey}
                        onPress={() => {}}
                    >
                        <View>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="ios-settings-outline"
                                    size={30}
                                    color={Color.Black}
                                />
                            </Row>
                            <Row><Text>Edit Profile</Text></Row>
                        </View>
                    </TouchableHighlight>
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
                </Row>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: Dimensions.get('window').width * 0.8 / 2,
    borderWidth: 2,
    borderColor: Color.BLUE,
    overflow: "hidden",
    marginVertical: Dimensions.get('window').height / 30,
    alignSelf: 'center',
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
    alignSelf: 'center',

  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 5,
    alignSelf:'center',
    
  },
  userInfo: {
    color: Color.Grey,
    fontSize: 14,
    alignSelf:'center',

  },
  iconContainer: {
    justifyContent: 'space-between',
    paddingLeft:55,
    paddingRight:40,
    
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
    marginHorizontal: 5,
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