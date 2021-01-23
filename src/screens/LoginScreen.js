import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import TextH1 from './../components/TextH1';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Input, Icon, Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../helpers';

const LoginScreen = () => {
  const [isusernamefilled, setisusernamefilled] = useState(false);
  const [ispassfilled, setispassfilled] = useState(false);
  const [secure, setsecure] = useState(true);
  const [flexview, setflexview] = useState(2);
  const [datauser, setdatauser] = useState({
    username: '',
    password: '',
  });

  const Auth = useSelector((state) => state.AllRedu);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  });

  const _keyboardDidShow = () => {
    setflexview(6);
  };

  const _keyboardDidHide = () => {
    setflexview(2);
  };

  const onInputChangeText = (text) => {
    if (text) {
      setisusernamefilled(true);
    } else {
      setisusernamefilled(false);
    }
    setdatauser({...datauser, username: text});
  };

  const onPassChangeText = (text) => {
    if (text) {
      setispassfilled(true);
    } else {
      setispassfilled(false);
    }
    setdatauser({...datauser, password: text});
  };

  const dispatch = useDispatch();

  const onLoginPress = () => {
    dispatch({type: 'LOADING'});
    Axios.post(`${API_URL}/auth/mobilelogin`,{
      emailuser: datauser.username,
      password: datauser.password,
    })
    .then((res)=> {
      const jsonID = JSON.stringify(res.data.dataLogin.user_id)
      console.log(jsonID);
      AsyncStorage.setItem('iduser', jsonID)
        .then(() => {
          dispatch({
            type: 'LOGIN',
            payload: res.data.dataLogin,
            cart: res.data.dataCart,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }).catch(err=> {
      dispatch({type: 'ERROR'});
      console.log(err.response.data.message);
    })
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient
          style={{flex: 1}}
          useAngle
          angle={45}
          locations={[0.3, 0.9]}
          colors={['#72ceb8', '#23c7c6']}>
          <StatusBar backgroundColor={'#23c7c6'} barStyle={'light-content'} />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextH1>AKEI</TextH1>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[styles.containerStyle, {flex: flexview}]}>
            <Input
              value={datauser.username}
              placeholder={'username/email'}
              placeholderTextColor={isusernamefilled ? '#23c7c6' : 'gray'}
              leftIcon={{
                type: 'font-awesome',
                name: 'user',
                color: isusernamefilled ? '#23c7c6' : 'gray',
              }}
              inputContainerStyle={{
                borderColor: isusernamefilled ? '#23c7c6' : 'gray',
              }}
              inputStyle={{color: '#23c7c6'}}
              label={'Username'}
              labelStyle={{color: isusernamefilled ? '#23c7c6' : 'gray'}}
              onChangeText={onInputChangeText}
              rightIcon={
                isusernamefilled ? (
                  <Animatable.View>
                    <Icon
                      type="Feather"
                      name="check-circle"
                      color="#23c7c6"
                      size={20}
                    />
                  </Animatable.View>
                ) : null
              }
            />
            <Input
              value={datauser.password}
              placeholder={'password'}
              placeholderTextColor={ispassfilled ? '#23c7c6' : 'gray'}
              secureTextEntry={secure}
              leftIcon={{
                type: 'font-awesome',
                name: 'lock',
                color: ispassfilled ? '#23c7c6' : 'gray',
              }}
              inputContainerStyle={{
                borderColor: ispassfilled ? '#23c7c6' : 'gray',
              }}
              inputStyle={{color: '#23c7c6'}}
              label={'Password'}
              onChangeText={onPassChangeText}
              labelStyle={{color: ispassfilled ? '#23c7c6' : 'gray'}}
              rightIcon={
                secure ? (
                  <Icon
                    type="font-awesome"
                    name="eye-slash"
                    color="gray"
                    size={20}
                    onPress={() => setsecure(!secure)}
                  />
                ) : (
                  <Icon
                    type="font-awesome"
                    name="eye"
                    color="#23c7c6"
                    size={20}
                    onPress={() => setsecure(!secure)}
                  />
                )
              }
            />
            <Button
              ViewComponent={LinearGradient}
              style={{
                paddingVertical: 5,
              }}
              linearGradientProps={{
                useAngle: true,
                angle: 45,
                locations: [0.3, 0.9],
                colors: ['#72ceb8', '#23c7c6'],
              }}
              title="Sign in"
              loading={Auth.isLoading}
              onPress={onLoginPress}
            />
            <Button
              ViewComponent={LinearGradient}
              style={{
                paddingVertical: 5,
              }}
              linearGradientProps={{
                useAngle: true,
                angle: 45,
                locations: [0.3, 0.9],
                colors: ['#72ceb8', '#23c7c6'],
              }}
              title="Register"
            />
          </Animatable.View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default LoginScreen;
