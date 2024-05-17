import useAppSelector from '@/common/hooks/useAppSelector';
import ComplexCounterDrawerNavigator, {
  ComplexCounterDrawerNavigatorParamList,
} from '@/screens/ComplexCounter/navigator/ComplexCounterDrawerNavigator';
import LandingStackNavigator, {
  LandingStackNavigatorParamList,
} from '@/screens/Landing/navigator/LandingStackNavigator';
import NotFoundScreen from '@/screens/NotFoundScreen';
import SimpleCounterDrawerNavigator, {
  SimpleCounterDrawerNavigatorParamList,
} from '@/screens/SimpleCounter/navigator/SimpleCounterDrawerNavigator';
import {
  selectIsFirstTime,
  selectSimpleMode,
} from '@/store/appConfig/appConfigSlice';
import {NavigatorScreenParams} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

export type RootStackNavigatorParamList = {
  LandingStackNavigator: NavigatorScreenParams<LandingStackNavigatorParamList>;
  SimpleCounterDrawerNavigator: NavigatorScreenParams<SimpleCounterDrawerNavigatorParamList>;
  ComplexCounterDrawerNavigator: NavigatorScreenParams<ComplexCounterDrawerNavigatorParamList>;
  NotFoundScreen: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackNavigatorParamList,
> = NativeStackScreenProps<RootStackNavigatorParamList, T>;

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();

export default function RootStackNavigator() {
  const isFirstTime = useAppSelector(selectIsFirstTime);
  const isSimpleMode = useAppSelector(selectSimpleMode);

  const initialRouteName = React.useMemo(() => {
    if (isFirstTime) {
      return 'LandingStackNavigator';
    }

    if (isSimpleMode) {
      return 'SimpleCounterDrawerNavigator';
    }

    return 'ComplexCounterDrawerNavigator';
  }, [isFirstTime, isSimpleMode]);

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name="LandingStackNavigator"
        component={LandingStackNavigator}
      />
      <RootStack.Screen
        name="SimpleCounterDrawerNavigator"
        component={SimpleCounterDrawerNavigator}
      />
      <RootStack.Screen
        name="ComplexCounterDrawerNavigator"
        component={ComplexCounterDrawerNavigator}
      />
      <RootStack.Screen name={'NotFoundScreen'} component={NotFoundScreen} />
    </RootStack.Navigator>
  );
}
