import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

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
});

export default ComfirmScreen = ({ route }) => {
  const { imageUrl } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.photo}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
};
