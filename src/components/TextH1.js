import React from 'react';
import {Text} from 'react-native';

const TextH1 = (props) => {
  return (
    <Text
      style={{
        ...{fontSize: 35, fontWeight: '700', color: 'white'},
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
};

export default TextH1;
