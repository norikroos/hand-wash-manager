import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { createPhoto } from '../store/actions/photo';
import axios from 'axios';
import Environment from '../config/environments';

const URL =
  'https://vision.googleapis.com/v1/images:annotate?key=' +
  Environment['GOOGLE_CLOUD_VISION_API_KEY'];

const VALID_LABEL_SCORE = 0.8; // CloudVisionAPIにより判定されたスコアの採用基準

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    flex: 1,
    width: '100%',
  },
  modalCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
});

const ComfirmScreen = ({ route }) => {
  const { pictureData } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [labelData, setLabelData] = useState(null);
  const [resultText, setResultText] = useState('いいね');

  useEffect(() => {
    initConfirm();
  }, []);

  const initConfirm = async () => {
    const res = await fetchLabelData(pictureData);
    setLabelData(res);
    const handLabel = res.labelAnnotations
      .filter(r => r.description == 'Hand')
      .shift();

    const washingLabel = res.labelAnnotations
      .filter(r => r.description == 'Washing')
      .shift();

    if (!validLabel(handLabel)) {
      setResultText('それ、手？');
    } else if (!validLabel(washingLabel)) {
      setResultText('ちゃんと手洗って？');
    }

    setIsLoading(false);
  };

  const validLabel = label => {
    return !label || label.score < VALID_LABEL_SCORE ? false : true;
  };

  const fetchLabelData = async pictureData => {
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

      console.log('fetching API data: ' + URL);
      const response = await axios.post(URL, body);
      if (response) {
        console.log(response.data.responses[0]);
        return response.data.responses[0];
      } else {
        return {};
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.photo}
        source={{
          uri: pictureData.uri,
        }}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalCard}>
          {isLoading ? (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading...</Text>
            </View>
          ) : (
            <View>
              <Text>{resultText}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  title="閉じる"
                  onPress={() => setIsModalVisible(false)}
                />
                <Button title="送る" onPress={() => setIsModalVisible(false)} />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createPhoto: photo => dispatch(createPhoto(photo)),
  };
};

export default connect(mapDispatchToProps)(ComfirmScreen);
