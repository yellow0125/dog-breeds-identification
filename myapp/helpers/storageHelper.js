import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {

  try {
    await AsyncStorage.setItem(key, value)
  } catch (err) {
    console.log('Error storing data', err)
  }
};

export const getItemFor = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }

  } catch (err) {
    console.log('Error getting data', err)
  }
}