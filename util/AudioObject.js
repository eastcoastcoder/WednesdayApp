import Sound from 'react-native-sound';

export default class AudioObject {
  constructor(filePath) {
    return new Sound(filePath, Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log('failed to load the sound', error);
    });
  }
}
