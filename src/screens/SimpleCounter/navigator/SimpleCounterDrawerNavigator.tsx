import SimpleCounterDetailScreen from '@/screens/SimpleCounter/SimpleCounterDetailScreen';
import SimpleCounterListScreen from '@/screens/SimpleCounter/SimpleCounterListScreen';
import SimpleCounterDrawerContent from '@/screens/SimpleCounter/navigator/SimpleCounterDrawerContent';
import {
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';

export type SimpleCounterDrawerNavigatorParamList = {
  SimpleCounterListScreen: undefined;
  SimpleCounterDetailScreen: undefined;
};

export type SimpleCounterDrawerNavigationProps<
  T extends keyof SimpleCounterDrawerNavigatorParamList,
> = DrawerScreenProps<SimpleCounterDrawerNavigatorParamList, T>;

const SimpleCounterDrawer =
  createDrawerNavigator<SimpleCounterDrawerNavigatorParamList>();

export default function SimpleCounterDrawerNavigator() {
  return (
    <SimpleCounterDrawer.Navigator
      initialRouteName="SimpleCounterListScreen"
      drawerContent={SimpleCounterDrawerContent}>
      <SimpleCounterDrawer.Screen
        name="SimpleCounterListScreen"
        component={SimpleCounterListScreen}
      />
      <SimpleCounterDrawer.Screen
        name="SimpleCounterDetailScreen"
        component={SimpleCounterDetailScreen}
      />
    </SimpleCounterDrawer.Navigator>
  );
}
