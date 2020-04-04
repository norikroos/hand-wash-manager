import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    height: 80,
    marginBottom: 80,
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MyCamera = props => {
  const { afterTaking } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const pictureData = await camera.takePictureAsync({
      quality: 0.01,
      base64: true,
    });

    afterTaking(pictureData);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type}>
        <TouchableOpacity onPress={() => takePicture()} style={styles.button}>
          <Ionicons name="md-camera" size={50} color="#fff" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default MyCamera;
