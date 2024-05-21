import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import SettingMainScreen, {SettingMainScreenParams} from '../SettingMainScreen';
import {HomeBottomTabNavigationProps} from '@/screens/Home/navigator/HomeBottomTabNavigator';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';

export type SettingStackNavigatorParamList = {
  SettingMainScreen: SettingMainScreenParams;
};

export type SettingStackScreenProps =
  HomeBottomTabNavigationProps<'SettingStackNavigator'>;

export type SettingStackNavigationProp =
  NativeStackNavigationProp<SettingStackNavigatorParamList>;

export const SettingStackNavigatorOptions = (
  _props: SettingStackScreenProps,
): BottomTabNavigationOptions => ({
  title: '설정',
  tabBarIcon: ({color, size}) => (
    <Icon source="cog" color={color} size={size} />
  ),
});

const SettingStack =
  createNativeStackNavigator<SettingStackNavigatorParamList>();

export default function SettingStackNavigator(_props: SettingStackScreenProps) {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen
        name={'SettingMainScreen'}
        component={SettingMainScreen}
      />
    </SettingStack.Navigator>
  );
}
