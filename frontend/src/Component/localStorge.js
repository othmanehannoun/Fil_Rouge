import {AsyncStorage} from 'react-native';

const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}

const _retrieveData = async (key) => {
  try {
     await AsyncStorage.getItem(key); 
  } catch (error) {
    console.log(error);
  }
}

export {_storeData, _retrieveData};