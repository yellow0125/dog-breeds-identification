import { View } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { form } from '../../constants/Style';
import { storage } from '../../firebase/firebase-setup';
import { getDownloadURL, ref } from "firebase/storage";
export default function ResultImage(props) {
  const [imageUri, setImageUri] = useState('');
  const { uri, style } = props
  useEffect(() => {
    const getImageURL = async () => {
      try {
        if (uri) {

          const reference = ref(storage, uri);
          const downloadImageURL = await getDownloadURL(reference);
          setImageUri(downloadImageURL);
        }
      } catch (err) {
        console.log("download image ", err);
      }
    };
    getImageURL();
  }, []);

    return (
          <View style={style}>
            <Image source={imageUri ? { uri: imageUri } : null} style={form.imageR} />
          </View>
    )
  }


