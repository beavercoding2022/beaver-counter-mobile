import HomeBottomTabNavigator, {
  HomeBottomTabNavigatorParamList,
} from '@/screens/Home/navigator/HomeBottomTabNavigator';
import NotFoundScreen from '@/screens/NotFoundScreen';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

export type RootStackNavigatorParamList = {
  HomeBottomTabNavigator: NavigatorScreenParams<HomeBottomTabNavigatorParamList>;
  NotFoundScreen: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackNavigatorParamList,
> = NativeStackScreenProps<RootStackNavigatorParamList, T>;

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={'HomeBottomTabNavigator'}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name="HomeBottomTabNavigator"
        component={HomeBottomTabNavigator}
      />
      <RootStack.Screen name={'NotFoundScreen'} component={NotFoundScreen} />
    </RootStack.Navigator>
  );
}
