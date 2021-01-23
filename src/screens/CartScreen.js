import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {API_URL} from './../helpers';
import Header from './../components/Header';
import {Button, Icon} from 'react-native-elements';
import TextH1 from '../components/TextH1';
import LinearGradient from 'react-native-linear-gradient';

const CartScreen = () => {
  const Auth = useSelector((state) => state.AllRedu);
  console.log(Auth.cart);

  const totalharga = () => {
    return Auth.cart.reduce((total, val) => {
      return total + val.quantity * val.price;
    }, 0);
  };

  const renderCart = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        shadowRadius: 5,
      }}>
      <View>
        <Image
          source={{uri: API_URL + item.image}}
          style={{height: 100, width: 100}}
        />
      </View>
      <View>
        <Text>{item.product_name}</Text>
        <Text>{item.price}</Text>
        <Text>{item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <Header
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View style={{marginRight: 10}}>
            <Icon
              name={'cart-arrow-down'}
              type={'font-awesome-5'}
              size={25}
              color={'white'}
            />
          </View>
          <View>
            <TextH1 style={{fontSize: 25}}>Cart</TextH1>
          </View>
        </Header>
        <View style={{paddingHorizontal: 10}}>
          <FlatList
            data={Auth.cart}
            keyExtractor={(item) => `${item.idprod}`}
            renderItem={renderCart}
          />
        </View>
      </View>

      {/* -----bottom----- */}
      <View style={{paddingHorizontal: 10, paddingBottom: 1}}>
        <View
          style={{
            height: 70,
            backgroundColor: 'white',
            borderRadius: 5,
            elevation: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View>
            <Text>Total Harga</Text>
            <Text style={{color: '#72ceb8', fontWeight: '600', fontSize: 20}}>
              Rp. {totalharga()}
            </Text>
          </View>
          <Button
            ViewComponent={LinearGradient}
            style={{
              paddingVertical: 5,
              width: 100,
            }}
            linearGradientProps={{
              useAngle: true,
              angle: 45,
              locations: [0.3, 0.9],
              colors: ['#72ceb8', '#daf3ed'],
            }}
            title="Bayar"
          />
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
