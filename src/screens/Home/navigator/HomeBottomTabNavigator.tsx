import CounterDetailScreen, {
  CounterDetailScreenParams,
} from '@/screens/Home/CounterDetailScreen';
import CounterListScreen, {
  CounterListScreenOptions,
  CounterListScreenParams,
} from '@/screens/Home/CounterListScreen';
import SettingStackNavigator, {
  SettingStackNavigatorOptions,
  SettingStackNavigatorParamList,
} from '@/screens/Home/Setting/navigator/SettingStackNavigator';
import HomeBottomTabBar from '@/screens/Home/component/HomeBottomTabBar';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';

export type HomeBottomTabNavigatorParamList = {
  CounterListScreen: CounterListScreenParams;
  CounterDetailScreen: CounterDetailScreenParams;
  SettingStackNavigator: NavigatorScreenParams<SettingStackNavigatorParamList>;
};

export type HomeBottomTabNavigationProps<
  T extends keyof HomeBottomTabNavigatorParamList,
> = BottomTabScreenProps<HomeBottomTabNavigatorParamList, T>;

const HomeBottomTab =
  createBottomTabNavigator<HomeBottomTabNavigatorParamList>();

export default function HomeBottomTabNavigator() {
  return (
    <HomeBottomTab.Navigator
      initialRouteName="CounterListScreen"
      tabBar={props => <HomeBottomTabBar {...props} />}>
      <HomeBottomTab.Screen
        name="CounterListScreen"
        component={CounterListScreen}
        options={CounterListScreenOptions}
      />
      <HomeBottomTab.Screen
        name="CounterDetailScreen"
        component={CounterDetailScreen}
      />
      <HomeBottomTab.Screen
        name="SettingStackNavigator"
        component={SettingStackNavigator}
        options={SettingStackNavigatorOptions}
      />
    </HomeBottomTab.Navigator>
  );
}
