import {Platform} from 'react-native';
const RNFS = require('react-native-fs');

const AppFolder = 'todoApp';

export const dirHome = Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/todoApp`,
    android: `${RNFS.ExternalStorageDirectoryPath}/todoApp`
});

export const dirPictures = `${dirHome}/Pictures`;
export const dirAudio = `${dirHome}/Audio`;