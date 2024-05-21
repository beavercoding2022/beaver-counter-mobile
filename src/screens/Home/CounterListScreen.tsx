import FullCenteredView from '@/common/components/FullCenteredView';
import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppSelector from '@/common/hooks/useAppSelector';
import CounterListItem from '@/screens/Home/component/CounterListItem';
import {
  addRandomCounter,
  selectAllCounters,
} from '@/store/counter/counterSlice';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Divider, Icon, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {},
  bottomButton: {
    borderRadius: 0,
  },
});

export type CounterListScreenParams = undefined;

export const CounterListScreenOptions: BottomTabNavigationOptions = {
  title: '카운터 목록',
  tabBarIcon: ({color, size}) => (
    <Icon source="format-list-numbered" color={color} size={size} />
  ),
};

export default function CounterListScreen() {
  const ref = React.useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const {counters} = useAppSelector(selectAllCounters);

  return (
    <FullCenteredView style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={counters}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Text>카운터가 없습니다.</Text>
          </View>
        }
        ref={ref}
        renderItem={({item}) => <CounterListItem {...item} />}
        scrollEnabled={true}
        extraData={counters.length}
      />
      <View style={styles.bottomButtonContainer}>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => {
            dispatch(addRandomCounter());
            setTimeout(() => {
              ref.current?.scrollToEnd({
                animated: true,
              });
            }, 300);
          }}
          style={styles.bottomButton}>
          추가하기
        </Button>
      </View>
    </FullCenteredView>
  );
}
