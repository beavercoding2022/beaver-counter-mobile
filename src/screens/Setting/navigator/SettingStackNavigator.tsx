import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import SettingMainScreen, {SettingMainScreenParams} from '../SettingMainScreen';

export type SettingStackParamList = {
  SettingMainScreen: SettingMainScreenParams;
};

export type SettingStackNavigationProp =
  NativeStackNavigationProp<SettingStackParamList>;

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name={'SettingMainScreen'}
        component={SettingMainScreen}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStackNavigator;
