// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
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
  const token = '...';
  const getFrogAlbumPhotos = () => api.get(`${albumId}/photos`, { fields: 'images', access_token: token });

  return {
    getFrogAlbumPhotos
  };
};

export default {
  create
};
