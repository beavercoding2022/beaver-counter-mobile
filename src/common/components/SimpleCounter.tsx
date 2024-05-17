import {Counter} from '@/store/counter/counterSlice';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

export type SimpleCounterProps = Counter;

export default function SimpleCounter(props: SimpleCounterProps) {
  return (
    <View>
      <Text>{props.id}</Text>
      <Text>{props.value}</Text>
    </View>
  );
}
