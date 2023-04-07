import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, Dimensions,
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

const RESULT_MAPPING = ['circle', 'triangle']

export default function Homepage({ route }) {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false)

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

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    // console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const __savePhoto = () => {
    setLoading(true)
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }
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
    // console.log(cameraType)
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  const cameraRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');

  const handleImageCapture = async () => {
    setIsProcessing(true);
    const imageData = await cameraRef.current.takePictureAsync({
      base64: true,
    });
    processImagePrediction(imageData);
  };

  const processImagePrediction = async (base64Image) => {
    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);

    const prediction = await startPrediction(model, tensor);

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    setPresentedShape(RESULT_MAPPING[highestPrediction]);
  };

  // return (
  //   <>
  //     {loading && <Loading />}
  //     <View style={styles.container}>
  //       <View
  //         style={{
  //           flex: 1,
  //           width: '100%'
  //         }}
  //       >
  //         {previewVisible && capturedImage ? (
  //           <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
  //         ) : (
  //           <Camera
  //             type={cameraType}
  //             flashMode={flashMode}
  //             style={{ flex: 1 }}
  //             ref={r => setCamera(r)}
  //           >
  //             <View
  //               style={{
  //                 flex: 1,
  //                 width: '100%',
  //                 backgroundColor: 'transparent',
  //                 flexDirection: 'row'
  //               }}
  //             >
  //               {/* flash and switch */}
  //               <View
  //                 style={{
  //                   position: 'absolute',
  //                   left: '85%',
  //                   top: '10%',
  //                   flexDirection: 'column',
  //                   justifyContent: 'space-between'
  //                 }}
  //               >
  //                 {flashMode === 'off' ? (<TouchableOpacity
  //                   onPress={__handleFlashMode}
  //                   style={{
  //                     borderRadius: 50,
  //                     height: 35,
  //                     width: 35
  //                   }}
  //                 >
  //                   <Ionicons name="flash-off-outline" size={30} color="white" />
  //                 </TouchableOpacity>) : (<TouchableOpacity
  //                   onPress={__handleFlashMode}
  //                   style={{
  //                     borderRadius: 50,
  //                     height: 35,
  //                     width: 35
  //                   }}
  //                 >
  //                   <Ionicons name="flash" size={30} color='gold' />
  //                 </TouchableOpacity>)}


  //                 <TouchableOpacity
  //                   onPress={__switchCamera}
  //                   style={{
  //                     marginTop: 20,
  //                     borderRadius: 50,
  //                     height: 35,
  //                     width: 35
  //                   }}
  //                 >
  //                   <MaterialCommunityIcons name="camera-flip-outline" size={30} color="white" />
  //                 </TouchableOpacity>
  //               </View>
  //               {/* #take pic */}
  //               <View
  //                 style={{
  //                   position: 'absolute',
  //                   bottom: 0,
  //                   flexDirection: 'row',
  //                   flex: 1,
  //                   width: '100%',
  //                   padding: 20,
  //                   justifyContent: 'space-between'
  //                 }}
  //               >
  //                 <View
  //                   style={{
  //                     alignSelf: 'center',
  //                     flex: 1,
  //                     alignItems: 'center'
  //                   }}
  //                 >
  //                   <TouchableOpacity
  //                     onPress={__takePicture}
  //                     style={{
  //                       width: 70,
  //                       height: 70,
  //                       bottom: 0,
  //                       borderRadius: 50,
  //                       backgroundColor: '#fff'
  //                     }}
  //                   />
  //                 </View>
  //               </View>
  //             </View>
  //           </Camera>
  //         )}
  //       </View>
  //     </View>
  //   </>

  // )

  return (
    <View style={styles.container}>
      <Modal visible={isProcessing} transparent={true} animationType="slide">
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
      </Modal>

      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        autoFocus={true}
        whiteBalance={Camera.Constants.WhiteBalance.auto}></Camera>
      <Pressable
        onPress={() => handleImageCapture()}
        style={styles.captureButton}></Pressable>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

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
    left: Dimensions.get('screen').width / 2 - 50,
    bottom: 40,
    width: 100,
    zIndex: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
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

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  // console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Go identifying
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
