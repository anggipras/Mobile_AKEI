import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import Axios from 'axios';
import {API_URL} from '../helpers';
import Header from '../components/Header';
import {Icon} from 'react-native-elements';
import TextH1 from '../components/TextH1';

const SearchScreen = (props) => {
  const [product, setproduct] = useState([]);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []); //sama dengan didmount

  const fetchdata = async () => {
    try {
      const {data} = await Axios.get(`${API_URL}/admin/getAllProductMobile`);
      console.log(data);
      setproduct(data);
      setrefresh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onTodetailsPress = (item) => {
    props.navigation.navigate('Details', {data: item});
  };

  const renderProduct = (
    {item}, //item sama dengan val di map
  ) => (
    <ImageBackground
      source={{uri: API_URL + item.image}}
      style={styles.containerimageBgstyle}
      imageStyle={{borderRadius: 5}}>
      <TouchableWithoutFeedback onPress={() => onTodetailsPress(item)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}>
          <Text style={{color: 'white', textTransform: 'capitalize'}}>
            {item.product_name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );

  const onRefreshFlatList = () => {
    setrefresh(true);
    fetchdata();
  };

  return (
    <View style={{flex: 1}}>
      <Header
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={{marginRight: 10}}>
          <Icon
            name={'search-location'}
            type={'font-awesome-5'}
            size={25}
            color={'white'}
          />
        </View>
        <View>
          <TextH1 style={{fontSize: 25}}>Catalog</TextH1>
        </View>
      </Header>
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <FlatList
          data={product}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={onRefreshFlatList}
              refreshing={refresh}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerimageBgstyle: {
    height: 200,
    width: '100%',
    marginVertical: 5,
  },
});

export default SearchScreen;
