import * as React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';

//Screens
import Home from '../screens/Home';
import SessionManagement from '../screens/SessionManagement';
import ConnectwithClient from '../screens/ConnectwithClient';
import WorkoutandDietPlans from '../screens/WorkoutandDietPlans';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

export default function TabContainer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#222B45',
          height: windowHeight / 12,
          borderWidth: 1,
          paddingBottom: 3,
        },
        tabBarActiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="house" style={[{tintColor: color}]} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionManagement}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="billBoard" style={[{tintColor: color}]} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ConnectwithClient}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="chat" style={[{tintColor: color}]} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={WorkoutandDietPlans}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="fire" style={[{tintColor: color}]} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
