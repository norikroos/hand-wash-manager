import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyCamera from '../components/MyCamera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraScreen = props => {
  const { navigation } = props;
  const afterTaking = imageUrl => {
    navigation.navigate('Comfirm', { imageUrl: imageUrl });
  };
  return (
    <View style={styles.container}>
      <MyCamera afterTaking={afterTaking} />
    </View>
  );
};
