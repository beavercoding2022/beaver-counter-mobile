import ComplexCounterDetailScreen, {
  ComplexCounterDetailScreenParams,
} from '@/screens/ComplexCounter/ComplexCounterDetailScreen';
import ComplexCounterListScreen, {
  ComplexCounterListScreenParams,
} from '@/screens/ComplexCounter/ComplexCounterListScreen';
import ComplexCounterDrawerContent from '@/screens/ComplexCounter/navigator/ComplexCounterDrawerContent';
import {
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';

export type ComplexCounterDrawerNavigatorParamList = {
  ComplexCounterListScreen: ComplexCounterListScreenParams;
  ComplexCounterDetailScreen: ComplexCounterDetailScreenParams;
};

export type ComplexCounterDrawerNavigationProps<
  T extends keyof ComplexCounterDrawerNavigatorParamList,
> = DrawerScreenProps<ComplexCounterDrawerNavigatorParamList, T>;

const ComplexCounterDrawer =
  createDrawerNavigator<ComplexCounterDrawerNavigatorParamList>();

export default function ComplexCounterDrawerNavigator() {
  return (
    <ComplexCounterDrawer.Navigator
      initialRouteName="ComplexCounterListScreen"
      drawerContent={ComplexCounterDrawerContent}>
      <ComplexCounterDrawer.Screen
        name="ComplexCounterListScreen"
        component={ComplexCounterListScreen}
      />
      <ComplexCounterDrawer.Screen
        name="ComplexCounterDetailScreen"
        component={ComplexCounterDetailScreen}
      />
    </ComplexCounterDrawer.Navigator>
  );
}
