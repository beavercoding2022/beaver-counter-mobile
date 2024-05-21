import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppNavigation from '@/common/hooks/useAppNavigation';
import {Counter, removeCounter} from '@/store/counter/counterSlice';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text, useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  iconAndName: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  removeButton: {
    padding: 16,
  },
});

export type CounterListItemProps = Counter;

export default function CounterListItem(props: CounterListItemProps) {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const theme = useTheme();

  const handlePressRemove = React.useCallback(() => {
    dispatch(removeCounter(props.id));
  }, [dispatch, props.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconAndName}
        onPress={() => {
          navigation.navigate('HomeBottomTabNavigator', {
            screen: 'CounterDetailScreen',
            params: {
              id: props.id,
            },
          });
        }}>
        <Icon
          source={props.icon}
          color={props.color?.textColor || theme.colors.secondary}
          size={24}
        />
        <Text>{props.name}</Text>
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <Text>{props.value}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handlePressRemove}>
          <Icon source="minus-circle" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
