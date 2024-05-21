import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';

export default function useAppRoute<T extends ParamListBase = ParamListBase>() {
  const route = useRoute<RouteProp<T>>();
  return route;
}
