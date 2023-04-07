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

const RESULT_MAPPING = ['n02085620-Chihuahua',
  'n02085782-Japanese_spaniel',
  'n02085936-Maltese_dog',
  'n02086079-Pekinese',
  'n02086240-Shih-Tzu',
  'n02086646-Blenheim_spaniel',
  'n02086910-papillon',
  'n02087046-toy_terrier',
  'n02087394-Rhodesian_ridgeback',
  'n02088094-Afghan_hound',
  'n02088238-basset',
  'n02088364-beagle',
  'n02088466-bloodhound',
  'n02088632-bluetick',
  'n02089078-black-and-tan_coonhound',
  'n02089867-Walker_hound',
  'n02089973-English_foxhound',
  'n02090379-redbone',
  'n02090622-borzoi',
  'n02090721-Irish_wolfhound',
  'n02091032-Italian_greyhound',
  'n02091134-whippet',
  'n02091244-Ibizan_hound',
  'n02091467-Norwegian_elkhound',
  'n02091635-otterhound',
  'n02091831-Saluki',
  'n02092002-Scottish_deerhound',
  'n02092339-Weimaraner',
  'n02093256-Staffordshire_bullterrier',
  'n02093428-American_Staffordshire_terrier',
  'n02093647-Bedlington_terrier',
  'n02093754-Border_terrier',
  'n02093859-Kerry_blue_terrier',
  'n02093991-Irish_terrier',
  'n02094114-Norfolk_terrier',
  'n02094258-Norwich_terrier',
  'n02094433-Yorkshire_terrier',
  'n02095314-wire-haired_fox_terrier',
  'n02095570-Lakeland_terrier',
  'n02095889-Sealyham_terrier',
  'n02096051-Airedale',
  'n02096177-cairn',
  'n02096294-Australian_terrier',
  'n02096437-Dandie_Dinmont',
  'n02096585-Boston_bull',
  'n02097047-miniature_schnauzer',
  'n02097130-giant_schnauzer',
  'n02097209-standard_schnauzer',
  'n02097298-Scotch_terrier',
  'n02097474-Tibetan_terrier',
  'n02097658-silky_terrier',
  'n02098105-soft-coated_wheaten_terrier',
  'n02098286-West_Highland_white_terrier',
  'n02098413-Lhasa',
  'n02099267-flat-coated_retriever',
  'n02099429-curly-coated_retriever',
  'n02099601-golden_retriever',
  'n02099712-Labrador_retriever',
  'n02099849-Chesapeake_Bay_retriever',
  'n02100236-German_short-haired_pointer',
  'n02100583-vizsla',
  'n02100735-English_setter',
  'n02100877-Irish_setter',
  'n02101006-Gordon_setter',
  'n02101388-Brittany_spaniel',
  'n02101556-clumber',
  'n02102040-English_springer',
  'n02102177-Welsh_springer_spaniel',
  'n02102318-cocker_spaniel',
  'n02102480-Sussex_spaniel',
  'n02102973-Irish_water_spaniel',
  'n02104029-kuvasz',
  'n02104365-schipperke',
  'n02105056-groenendael',
  'n02105162-malinois',
  'n02105251-briard',
  'n02105412-kelpie',
  'n02105505-komondor',
  'n02105641-Old_English_sheepdog',
  'n02105855-Shetland_sheepdog',
  'n02106030-collie',
  'n02106166-Border_collie',
  'n02106382-Bouvier_des_Flandres',
  'n02106550-Rottweiler',
  'n02106662-German_shepherd',
  'n02107142-Doberman',
  'n02107312-miniature_pinscher',
  'n02107574-Greater_Swiss_Mountain_dog',
  'n02107683-Bernese_mountain_dog',
  'n02107908-Appenzeller',
  'n02108000-EntleBucher',
  'n02108089-boxer',
  'n02108422-bull_mastiff',
  'n02108551-Tibetan_mastiff',
  'n02108915-French_bulldog',
  'n02109047-Great_Dane',
  'n02109525-Saint_Bernard',
  'n02109961-Eskimo_dog',
  'n02110063-malamute',
  'n02110185-Siberian_husky',
  'n02110627-affenpinscher',
  'n02110806-basenji',
  'n02110958-pug',
  'n02111129-Leonberg',
  'n02111277-Newfoundland',
  'n02111500-Great_Pyrenees',
  'n02111889-Samoyed',
  'n02112018-Pomeranian',
  'n02112137-chow',
  'n02112350-keeshond',
  'n02112706-Brabancon_griffon',
  'n02113023-Pembroke',
  'n02113186-Cardigan',
  'n02113624-toy_poodle',
  'n02113712-miniature_poodle',
  'n02113799-standard_poodle',
  'n02113978-Mexican_hairless',
  'n02115641-dingo',
  'n02115913-dhole',
  'n02116738-African_hunting_dog']

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
      }
      await uploadDogToDB({
        breeds,
        uri,
      });
      console.log('image upload success')
    } catch (err) {
      console.log("image upload ", err);
    }
    console.log(uri)
    props.navigation.navigate('Resultpage',{uri})
    setIsProcessing(false);
    setPresentedShape(breeds)
    
    
    resetOperation
  };

  function resetOperation() {
    setPresentedShape('');
    setImageUri('')
}

  return (
    <View style={styles.container}>
      {isProcessing && <Loading />}
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

