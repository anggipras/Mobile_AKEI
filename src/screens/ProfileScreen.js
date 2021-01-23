import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <Text>Data Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
