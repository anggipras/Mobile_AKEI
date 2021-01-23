import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {API_URL} from './src/helpers';
import HomeStackRoot from './src/navigations/Homestackroot';
import AuthStackRoot from './src/navigations/Authstackroot';
import SplashScreen from './src/screens/SplashScreen';

const AppMain = () => {
  const Auth = useSelector((state) => state.AllRedu);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('iduser')
      .then((result) => {
        if (result !== null) {
          Axios.get(`${API_URL}/auth/keepLogin/${result}`)
            .then((res) => {
              dispatch({
                type: 'LOGIN',
                payload: res.data.dataLogin,
                cart: res.data.dataCart,
              });
            })
            .catch((err) => {
              alert(err);
            })
            .finally(() => {
              setloading(false);
            });
        } else {
          setloading(false);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  });

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        {Auth.isLogin ? <HomeStackRoot /> : <AuthStackRoot />}
      </NavigationContainer>
    </>
  );
};

export default AppMain;
