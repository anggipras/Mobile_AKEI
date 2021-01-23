import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Header = (props) => {
  return (
    <LinearGradient
      style={[{height: 50, width: '100%', alignSelf: 'center'}, props.style]}
      useAngle
      angle={45}
      locations={[0.3, 0.9]}
      colors={['#72ceb8', '#daf3ed']}>
      {props.children}
    </LinearGradient>
  );
};

export default Header;
