import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextH1 from './../components/TextH1';
import * as Animatable from 'react-native-animatable';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';

const SplashScreen = () => {
  return (
    <LinearGradient
      useAngle
      angle={45}
      locations={[0.3, 0.9]}
      colors={['#daf3ed', '#72ceb8']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animatable.View animation="bounceIn" iterationCount={'infinite'}>
        <TextH1>
          <Fontawesome name="chair" color="white" size={25} />
          {' AKEI'}
        </TextH1>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;
