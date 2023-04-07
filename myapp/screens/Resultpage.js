import { View, Text, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { firestore as db } from '../firebase/firebase-setup'
import ResultImage from '../components/UI/ResultImage';
export default function Resultpage({ navigation, route }) {
  const [res, setRes] = useState([{'breeds':'','uri':''}])
  console.log(route.params)
  console.log(res)
  useEffect(() => {
    const unsubsribe = onSnapshot(
      query(
        collection(db, "dogs"),
        where("uri", "==", route.params.imageUri)),
      (QuerySnapshot) => {
        if (QuerySnapshot.empty) {
          setRes(null);
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
    <View>
      <Text>Resultpage</Text>
      <Text>{item.breeds}</Text>
      {item.uri != '' && <ResultImage uri={item.uri}/>}
    </View>

  )
}