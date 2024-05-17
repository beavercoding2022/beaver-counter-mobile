import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import LandingWelcomeScreen, {
  LandingWelcomeScreenOptions,
  LandingWelcomeScreenParams,
} from '@/screens/Landing/LandingWelcomeScreen';

export type LandingStackNavigatorParamList = {
  LandingWelcomeScreen: LandingWelcomeScreenParams;
};

export type LandingStackNavigationProp =
  NativeStackNavigationProp<LandingStackNavigatorParamList>;

const LandingStack =
  createNativeStackNavigator<LandingStackNavigatorParamList>();

const LandingStackNavigator = () => {
  return (
    <LandingStack.Navigator initialRouteName="LandingWelcomeScreen">
      <LandingStack.Screen
        name="LandingWelcomeScreen"
        component={LandingWelcomeScreen}
        options={LandingWelcomeScreenOptions}
      />
    </LandingStack.Navigator>
  );
};

export default LandingStackNavigator;
