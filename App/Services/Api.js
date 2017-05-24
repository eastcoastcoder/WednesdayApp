import Secrets from 'react-native-config';
import apisauce from 'apisauce';

const create = (baseURL = 'https://graph.facebook.com/v2.9/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 20000
  });

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce);
  }

  const albumId = '1726444857365752';
  const token = `${Secrets.APPID}|${Secrets.APPSECRET}`;
  const getFrogAlbumPhotos = () => api.get(`${albumId}/photos`, { fields: 'images', access_token: token });

  return {
    getFrogAlbumPhotos
  };
};

export default {
  create
};
