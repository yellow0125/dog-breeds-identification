import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { firestore as db } from '../firebase/firebase-setup'
import ResultImage from '../components/UI/ResultImage';
import { form } from '../constants/Style';
import Color from '../constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Resultpage({ route }) {

  const [res, setRes] = useState([{ 'breeds': '', 'uri': '' }])
  useEffect(() => {
    const unsubsribe = onSnapshot(
      query(
        collection(db, "dogs"),
        where("uri", "==", route.params.uri)),
      (QuerySnapshot) => {
        if (QuerySnapshot.empty) {
          setRes([{ 'breeds': '', 'uri': '' }]);
          return;
        }
        setRes(
          QuerySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      });
    return () => {
      unsubsribe();
    }
  }, [],);
  const item = res[0]

  return (
    <>
      {item.uri != '' && <View>
        <View style={styles.imageContainer}>
          <ResultImage uri={item.uri} style={form.imageInDetail} />
        </View>
          <Text style={styles.title}><MaterialCommunityIcons name="dog" size={28} color={Color.Orange} /> {item.breeds}</Text>

        <Text style={styles.text}>Congrats! Based on the analysis of the image you provided, the computer vision algorithm has identified the dog you scanned looks like a {item.breeds}!</Text>
      </View>}
    </>

  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 20,
    color: Color.Black,
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'center',
    color:Color.Orange,
  },
  imageContainer: {
    width: "100%",
    height: Dimensions.get('window').height * 0.65,
  },
  text: {
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,

  }
})