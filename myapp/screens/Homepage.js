import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native'
import { Camera } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from './Loading';
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from '../helpers/tensorHelper';
import { cropPicture } from '../helpers/imageHelper';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase-setup";
import { uploadDogToDB } from "../firebase/firestore";

const RESULT_MAPPING = ['circle', 'triangle']

export default function Homepage(props) {

  const [startCamera, setStartCamera] = React.useState(false)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const cameraRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');
  const [imageUri, setImageUri] = useState('');

  const getImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.log("fetch image ", err);
    }
  };

  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermisson();
    return requestPermissionResponse.granted;
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      if (cameraStatus.status === 'granted') {
        setStartCamera(true)
      } else {
        Alert.alert('Access denied')
      }
    })();
  }, []);

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  const handleImageCapture = async () => {
    setIsProcessing(true);
    const img = await cameraRef.current.takePictureAsync({ quality: 0.1, });
    const imageData = await cameraRef.current.takePictureAsync({
      base64: true,
    });
    processImagePrediction(imageData, img.uri);
  };

  const processImagePrediction = async (base64Image, uri) => {
    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);

    const prediction = await startPrediction(model, tensor);

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    const breeds = RESULT_MAPPING[highestPrediction]
    try {
      if (uri) {
        const imageBlob = await getImage(uri);
        const imageName = uri.substring(uri.lastIndexOf("/") + 1);
        const imageRef = await ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytes(imageRef, imageBlob);
        uri = uploadResult.metadata.fullPath;
        setImageUri(uri);
      }
      await uploadDogToDB({
        breeds,
        uri,
      });
      console.log('image upload success')
    } catch (err) {
      console.log("image upload ", err);
    }
    setIsProcessing(false)
    setPresentedShape(breeds)
    console.log(imageUri)
    props.navigation.navigate('Resultpage',{imageUri})
  };

  return (
    <View style={styles.container}>
      {isProcessing && <Loading />}
      {/* <Modal visible={isProcessing} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Your current shape is {presentedShape}</Text>
            {presentedShape === '' && <ActivityIndicator size="large" />}
            <Pressable
              style={styles.dismissButton}
              onPress={() => {
                setPresentedShape('');
                setIsProcessing(false);
              }}>
              <Text>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}

      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        autoFocus={true}
        whiteBalance={Camera.Constants.WhiteBalance.auto}>
        <View
          style={{
            position: 'absolute',
            left: '85%',
            top: '10%',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {flashMode === 'off' ? (<TouchableOpacity
            onPress={__handleFlashMode}
            style={{
              borderRadius: 50,
              height: 35,
              width: 35
            }}
          >
            <Ionicons name="flash-off-outline" size={30} color="white" />
          </TouchableOpacity>) : (<TouchableOpacity
            onPress={__handleFlashMode}
            style={{
              borderRadius: 50,
              height: 35,
              width: 35
            }}
          >
            <Ionicons name="flash" size={30} color='gold' />
          </TouchableOpacity>)}
          <TouchableOpacity
            onPress={__switchCamera}
            style={{
              marginTop: 20,
              borderRadius: 50,
              height: 35,
              width: 35
            }}
          >
            <MaterialCommunityIcons name="camera-flip-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      <Pressable
        onPress={() => handleImageCapture()}
        style={styles.captureButton}></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    width: 70,
    zIndex: 100,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: 'gray',
  },
  dismissButton: {
    width: 150,
    height: 50,
    marginTop: 60,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

