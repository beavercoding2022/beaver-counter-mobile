import {RootStackNavigatorParamList} from '@/screens/RootStackNavigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function useAppNavigation() {
  const navigation =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  return navigation;
}
