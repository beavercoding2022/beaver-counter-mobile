import SimpleCounter from '@/common/components/SimpleCounter';
import useAppSelector from '@/common/hooks/useAppSelector';
import {selectCounters} from '@/store/counter/counterSlice';
import {FlatList, StyleSheet} from 'react-native';
import {Divider, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export type SimpleCounterListScreenParams = undefined;

export default function SimpleCounterListScreen() {
  const {counters} = useAppSelector(selectCounters);

  return (
    <FlatList
      style={styles.list}
      data={counters}
      renderItem={({item}) => <SimpleCounter {...item} />}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text variant="bodyLarge">카운터가 없습니다.</Text>}
      ItemSeparatorComponent={Divider}
    />
  );
}
