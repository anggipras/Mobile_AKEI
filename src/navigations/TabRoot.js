import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import HomeScreen from './../screens/HomeScreen';
import SearchScreen from './../screens/SearchScreen';
import CartScreen from './../screens/CartScreen';
import HistoryScreen from './../screens/HistoryScreen';
import ProfileScreen from './../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabRoot = () => {
  const Auth = useSelector((state) => state.AllRedu);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let type;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            type = 'feather';
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
            type = 'font-awesome';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-location' : 'search-location';
            type = 'font-awesome-5';
            return (
              <View
                style={{
                  marginTop: -40,
                  backgroundColor: '#72ceb8',
                  height: 60,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  borderWidth: 5,
                  borderColor: 'white',
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 10,
                    height: 100,
                  },
                  elevation: 10,
                  shadowRadius: 50,
                }}>
                <Icon name={iconName} type={type} size={30} color={'white'} />
              </View>
            );
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart-arrow-down' : 'cart-arrow-down';
            type = 'font-awesome-5';
          } else {
            iconName = focused ? 'user' : 'user';
            type = 'font-awesome-5';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} type={type} size={size} color={color} />;
        },
        tabBarLabel: ({focused, color}) => {
          return null;
        },
      })}
      tabBarOptions={{
        inactiveTintColor: 'lightgray',
        activeTintColor: '#23c7c6',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarBadge: Auth.cart.length}}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabRoot;
