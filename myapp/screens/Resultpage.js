import { View, Text, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { firestore as db } from '../firebase/firebase-setup'
import ResultImage from '../components/UI/ResultImage';
import { form } from '../constants/Style';
export default function Resultpage({ navigation, route }) {

  const [res, setRes] = useState([{ 'breeds': '', 'uri': '' }])

  console.log(route.params)
  console.log(res)
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
    <View>
      <Text>xxx</Text>
      {item.breeds != '' && <Text>{item.breeds}</Text>}
      {item.uri != '' && <ResultImage uri={item.uri}  style={form.imageInDetail}/>}
    </View>

  )
}