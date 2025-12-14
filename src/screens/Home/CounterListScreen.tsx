import FullCenteredView from '@/common/components/FullCenteredView';
import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppSelector from '@/common/hooks/useAppSelector';
import CounterListItem from '@/screens/Home/component/CounterListItem';
import {
  addRandomCounter,
  selectAllCounters,
  addCounterByOther,
  subtractCounterByOther,
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
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const toggleSelect = React.useCallback((id: string) => {
    setSelectedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  }, []);

  const canCalculate = selectedIds.length === 2;

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
        renderItem={({item}) => (
          <CounterListItem
            {...item}
            selected={selectedIds.includes(item.id)}
            onToggleSelect={toggleSelect}
          />
        )}
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
        {counters.length > 1 && (
          <View>
            <Divider />
            <View style={{flexDirection: 'row'}}>
              <Button
                icon="plus"
                mode="contained-tonal"
                disabled={!canCalculate}
                onPress={() => {
                  if (canCalculate) {
                    dispatch(
                      addCounterByOther({
                        targetId: selectedIds[0],
                        otherId: selectedIds[1],
                      }),
                    );
                  }
                }}
                style={[styles.bottomButton, {flex: 1}]}>
                선택1에 선택2 더하기
              </Button>
              <Button
                icon="minus"
                mode="contained-tonal"
                disabled={!canCalculate}
                onPress={() => {
                  if (canCalculate) {
                    dispatch(
                      subtractCounterByOther({
                        targetId: selectedIds[0],
                        otherId: selectedIds[1],
                      }),
                    );
                  }
                }}
                style={[styles.bottomButton, {flex: 1}]}>
                선택1에서 선택2 빼기
              </Button>
            </View>
            <View style={{padding: 8}}>
              <Text variant="bodySmall">
                팁: 항목을 길게 눌러 2개를 선택하세요.
              </Text>
            </View>
          </View>
        )}
      </View>
    </FullCenteredView>
  );
}
