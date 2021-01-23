import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {API_URL} from '../helpers';
import {Icon, Input, Button} from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';

const DetailScreen = ({navigation, route}) => {
  const [loading, setloading] = useState(false);
  const [qty, setqty] = useState('0');
  const Auth = useSelector((state) => state.AllRedu);
  const dispatch = useDispatch();
  const {
    image,
    price,
    totalprod,
    product_name,
    description,
    product_id,
  } = route.params.data;

  const addToCart = () => {
    setloading(true);
    Axios.post(`${API_URL}/cart/getTrx`, {
      user_id: Auth.user_id,
      product_id: product_id,
      quantity: qty,
    })
      .then(() => {
        Axios.get(`${API_URL}/cart/getCart/${Auth.user_id}`)
        .then((res)=> {
          dispatch({type: 'ADDTOCART', cart: res.data.cartData});
          alert('Succeed!');
          setloading(false);
        }).catch((err)=> {
          console.log(err);
        }).finally(()=> {
          setloading(false);
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 300,
      }}>
      <Input
        placeholder="quantity of item"
        keyboardType="numeric"
        value={qty}
        onChangeText={(text) => setqty(text)}
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
          colors: ['#daf3ed', '#72ceb8'],
        }}
        title="Add to cart"
        onPress={addToCart}
        loading={loading}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const sheetRef = useRef(null);

  const fall = new Animated.Value(1);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => sheetRef.current.snapTo(1)}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'white',
            opacity: Animated.add(0.1, Animated.multiply(fall, 0.9)),
          }}>
          <ImageBackground source={{uri: API_URL + image}} style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 20,
                  marginTop: 10,
                  backgroundColor: 'rgba(161, 153, 135, 0.6)',
                  borderRadius: 70,
                }}>
                <Icon
                  name="arrowleft"
                  type="antdesign"
                  color="white"
                  size={35}
                  style={{fontWeight: 'bold'}}
                />
              </View>
            </TouchableWithoutFeedback>
          </ImageBackground>
          <View style={{flex: 2, paddingHorizontal: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                marginVertical: 5,
                textTransform: 'capitalize',
              }}>
              {product_name}
            </Text>
            <Text style={{fontSize: 20, color: '#23c7c6', marginVertical: 5}}>
              Price
            </Text>
            <Text>{price}</Text>
            <Text style={{fontSize: 20, color: '#23c7c6', marginVertical: 5}}>
              Stock
            </Text>
            <Text>{totalprod}</Text>
            <Text style={{fontSize: 20, color: '#23c7c6', marginVertical: 5}}>
              Description
            </Text>
            <Text style={{fontSize: 20, marginVertical: 5}}>{description}</Text>
            <Button
              ViewComponent={LinearGradient}
              style={{
                paddingVertical: 5,
              }}
              linearGradientProps={{
                useAngle: true,
                angle: 45,
                locations: [0.3, 0.9],
                colors: ['#72ceb8', '#daf3ed'],
              }}
              title="Fill Quantity"
              onPress={() => sheetRef.current.snapTo(0)}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        initialSnap={1}
        renderContent={renderContent}
        renderHeader={renderHeader}
        callbackNode={fall}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});

export default DetailScreen;
