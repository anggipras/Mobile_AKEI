import React from 'react';
import {
  ScrollView,
  Text,
  Button,
  Platform,
  StyleSheet,
  StatusBar,
  FlatList,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native-animatable';
import TextH1 from '../components/TextH1';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'react-native-elements';

export default Homescreen = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.AllRedu);

  const onLogoutPress = () => {
    AsyncStorage.removeItem('iduser')
      .then(() => {
        dispatch({type: 'LOGOUT'});
      })
      .catch((err) => {
        alert(err);
      });
  };

  const Data = [
    {
      id: '1',
      foto: require('./../../assets/foto1.jpg'),
      category: 'Cupboard',
    },
    {
      id: '2',
      foto: require('./../../assets/foto2.jpg'),
      category: 'Chair',
    },
    {
      id: '3',
      foto: require('./../../assets/foto3.jpg'),
      category: 'Table',
    },
  ];

  const renderItem = ({item}) => (
    <View>
      <ImageBackground
        source={item.foto}
        style={style.imageBg}
        imageStyle={{borderRadius: 5}}>
        <Icon
          type="font-awesome"
          name="bookmark"
          color="white"
          size={30}
          style={{alignSelf: 'flex-end'}}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: '40%',
            textAlign: 'center',
          }}>
          {item.category}
        </Text>
      </ImageBackground>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <StatusBar backgroundColor={'#23c7c6'} barStyle={'light-content'} />
        <LinearGradient
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            alignSelf: 'center',
            position: 'absolute',
            transform: [{scaleX: 5}, {translateY: -15}],
          }}
          useAngle
          angle={45}
          locations={[0.3, 0.9]}
          colors={['#72ceb8', '#23c7c6']}></LinearGradient>
        <View
          style={{
            flex: 1,
            top: Platform.OS === 'ios' ? 40 : -5,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Fontawesome name="chair" color="white" size={20} />
              <TextH1 style={{fontSize: 20}}> AKEI</TextH1>
            </View>
            <TextH1 style={{fontSize: 20, fontWeight: '500', marginTop: 20}}>
              Halo, {Auth.username}
            </TextH1>
          </View>
          <View style={style.container1Style}>
            <View style={style.innercontainerStyle}>
              <Icon type="feather" name="map" color="#72ceb8" size={30} />
              <Text style={style.innertextcont1Style}>Map</Text>
            </View>
            <View style={style.innercontainerStyle}>
              <Icon type="feather" name="map-pin" color="#72ceb8" size={30} />
              <Text style={style.innertextcont1Style}>Pinned</Text>
            </View>
            <View style={style.innercontainerStyle}>
              <Icon
                type="material-icons"
                name="card-travel"
                color="#72ceb8"
                size={30}
              />
              <Text style={style.innertextcont1Style}>Wallet</Text>
            </View>
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, color: '#72ceb8'}}>What's yours</Text>
          </View>
          <View style={{marginTop: 10}}>
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 20, color: '#23c7c6'}}>Article</Text>
            <Icon type="material=icons" name="article" color="#23c7c6" />
          </View>
          <View style={{marginTop: 10}}>
            <View style={style.articlecontainerStyle}>
              <Text style={{fontSize: 15, color: '#23c7c6'}}>
                Cupboard Discount
              </Text>
              <Icon type="antdesign" name="arrowright" color="#23c7c6" />
            </View>
            <View style={style.articlecontainerStyle}>
              <Text style={{fontSize: 15, color: '#23c7c6'}}>
                Chair Discount
              </Text>
              <Icon type="antdesign" name="arrowright" color="#23c7c6" />
            </View>
            <View style={style.articlecontainerStyle}>
              <Text style={{fontSize: 15, color: '#23c7c6'}}>
                Table Discount
              </Text>
              <Icon type="antdesign" name="arrowright" color="#23c7c6" />
            </View>
          </View>
          <Button title="Logout" onPress={onLogoutPress} color="#23c7c6" />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container1Style: {
    flexDirection: 'row',
    marginTop: 50,
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 100,
    },
    elevation: 4,
    shadowOpacity: 1,
  },
  innercontainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  innertextcont1Style: {
    color: '#23c7c6',
    fontSize: 10,
    fontWeight: '100',
  },
  imageBg: {
    height: 200,
    width: 150,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    resizeMode: 'cover',
    padding: 5,
  },
  articlecontainerStyle: {
    borderColor: 'lightgray',
    marginVertical: 4,
    borderTopWidth: 1,
    paddingVertical: 7,
    borderBottomWidth: 2,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
