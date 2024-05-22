import {HomeBottomTabNavigationProps} from '@/screens/Home/navigator/HomeBottomTabNavigator';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import {Icon} from 'react-native-paper';
import SettingMainScreen, {
  SettingMainScreenOptions,
  SettingMainScreenParams,
} from '../SettingMainScreen';
import LicensesScreen, {
  LicensesScreenOptions,
} from '@/screens/Home/Setting/LicensesScreen';

export type SettingStackNavigatorParamList = {
  SettingMainScreen: SettingMainScreenParams;
  LicensesScreen: undefined;
};

export type SettingStackNavigatorProps =
  HomeBottomTabNavigationProps<'SettingStackNavigator'>;

export type SettingStackNavigationProps<
  T extends keyof SettingStackNavigatorParamList,
> = NativeStackScreenProps<SettingStackNavigatorParamList, T>;

export const SettingStackNavigatorOptions = (
  _props: SettingStackNavigatorProps,
): BottomTabNavigationOptions => ({
  title: '설정',
  tabBarIcon: ({color, size}) => (
    <Icon source="cog" color={color} size={size} />
  ),
  headerShown: false,
});

const SettingStack =
  createNativeStackNavigator<SettingStackNavigatorParamList>();

export default function SettingStackNavigator(
  _props: SettingStackNavigatorProps,
) {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name={'SettingMainScreen'}
        component={SettingMainScreen}
        options={SettingMainScreenOptions}
      />
      <SettingStack.Screen
        name={'LicensesScreen'}
        component={LicensesScreen}
        options={LicensesScreenOptions}
      />
    </SettingStack.Navigator>
  );
}
