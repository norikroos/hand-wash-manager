import axios from 'axios';
import Environment from '../../config/environments';

const URL =
  'https://vision.googleapis.com/v1/images:annotate?key=' +
  Environment['GOOGLE_CLOUD_VISION_API_KEY'];

export const createPhoto = photo => {
  return async (dispatch, getState) => {
    // make async call to database

    try {
      const body = {
        requests: [
          {
            features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
            image: {
              content: pictureData.base64,
            },
          },
        ],
      };

      console.log('fetching API進んだか困ったこと困ったこと data: ' + URL);
      const response = await axios.post(URL, body);
      if (response) {
        console.log(response.data.responses[0]);
        // return response.data.responses[0];
        dispatch({ type: 'CREATE_PHOTO', photo });
      } else {
        // return {};
      }
    } catch (error) {
      console.error(error);
    }
  };
};