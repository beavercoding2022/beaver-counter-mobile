import FullCenteredTouchableOpacity from '@/common/components/FullCenteredTouchableOpacity';
import FullCenteredView from '@/common/components/FullCenteredView';
import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppSelector from '@/common/hooks/useAppSelector';
import {getIconsList} from '@/common/utils/icon';
import DoubleColorPicker from '@/screens/Home/component/DoubleColorPicker';
import {HomeBottomTabNavigationProps} from '@/screens/Home/navigator/HomeBottomTabNavigator';
import {
  Counter,
  incrementCounter,
  selectCounter,
  updateCounterConfig,
} from '@/store/counter/counterSlice';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  editViewContainer: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },
  textInput: {
    flex: 1,
  },
  iconList: {
    flex: 1,
  },
  iconListContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonContainer: {},
  bottomButton: {
    borderRadius: 0,
  },
});

export type CounterDetailScreenParams = Pick<Counter, 'id'>;

export type CounterDetailScreenProps =
  HomeBottomTabNavigationProps<'CounterDetailScreen'>;

export default function CounterDetailScreen(props: CounterDetailScreenProps) {
  const {params} = props.route;
  const counter = useAppSelector(state => selectCounter(state, params?.id));

  // 유감스럽게도 useEffect를 쓸 수밖에 없음...
  React.useEffect(() => {
    props.navigation.setOptions(
      counter
        ? {
            title: counter.name,
            tabBarIcon: ({color, size}) => (
              <Icon source={counter.icon} color={color} size={size} />
            ),
          }
        : {
            title: '',
          },
    );
  }, [params.id, props, counter]);

  const dispatch = useAppDispatch();

  const theme = useTheme();
  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [iconName, setIconName] = React.useState<NonNullable<Counter['icon']>>(
    () => counter?.icon || '',
  );
  const [counterName, setCounterName] = React.useState<string>(
    () => counter?.name || '',
  );
  const initialBackgroundColor = React.useMemo(() => {
    return counter?.color?.backgroundColor || theme.colors.surface;
  }, [counter?.color, theme.colors.surface]);
  const [backgroundColor, setBackgroundColor] = React.useState<string>(
    () => initialBackgroundColor,
  );
  const initialTextColor = React.useMemo(() => {
    return counter?.color?.textColor || theme.colors.secondary;
  }, [counter?.color, theme.colors.secondary]);
  const [textColor, setTextColor] = React.useState<string>(
    () => initialTextColor,
  );

  const selectedIcons = React.useMemo(() => {
    return Object.keys(getIconsList()).filter(icon =>
      icon.toLowerCase().includes(iconName.toLowerCase()),
    );
  }, [iconName]);

  React.useEffect(() => {
    const handleFocus = () => {
      setEditMode(false);
    };

    const unsubscribe = props.navigation.addListener('focus', handleFocus);

    return () => {
      unsubscribe();
    };
  }, [props.navigation]);

  const renderIconListItem: ListRenderItem<NonNullable<Counter['icon']>> =
    React.useCallback(
      ({item}) => (
        <IconButton
          icon={item}
          size={20}
          iconColor={counter?.name === item ? 'red' : theme.colors.primary}
          onPress={() => {
            setIconName(item);
          }}
        />
      ),
      [counter?.name, theme.colors.primary],
    );

  if (!counter) {
    return (
      <FullCenteredView>
        <Text>카운터를 찾을 수 없습니다.</Text>
      </FullCenteredView>
    );
  }

  if (isEditMode) {
    return (
      <View style={styles.container}>
        <View style={styles.editViewContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              label="카운터 이름"
              value={counterName}
              style={styles.textInput}
              onChangeText={text => {
                setCounterName(text);
              }}
            />
          </View>
          <View>
            <View style={styles.textInputContainer}>
              <TextInput
                label="아이콘 이름"
                value={iconName}
                style={styles.textInput}
                onChangeText={text => {
                  setIconName(text);
                }}
              />
              <View style={styles.iconContainer}>
                <Icon source={counter.icon} size={20} />
              </View>
            </View>
            <FlatList
              style={styles.iconList}
              contentContainerStyle={styles.iconListContainer}
              data={selectedIcons}
              keyExtractor={item => item}
              ListEmptyComponent={
                <FullCenteredView>
                  <Text>아이콘 검색 결과가 없습니다.</Text>
                </FullCenteredView>
              }
              renderItem={renderIconListItem}
              numColumns={8}
              initialNumToRender={16}
              windowSize={16}
              getItemLayout={(data, index) => ({
                length: 32,
                offset: 32 * index,
                index,
              })}
              scrollEnabled
            />
          </View>
          <DoubleColorPicker
            backgroundColor={backgroundColor}
            textColor={textColor}
            initialBackgroundColor={initialBackgroundColor}
            initialTextColor={initialTextColor}
            setBackgroundColor={setBackgroundColor}
            setTextColor={setTextColor}
          />
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            icon="check"
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              dispatch(
                updateCounterConfig({
                  id: counter.id,
                  config: {
                    icon: iconName,
                    name: counterName,
                    color: {
                      backgroundColor,
                      textColor,
                    },
                  },
                }),
              );
              setEditMode(false);
            }}>
            수정 완료
          </Button>
        </View>
      </View>
    );
  }

  return (
    <FullCenteredTouchableOpacity
      style={{
        backgroundColor: counter.color?.backgroundColor || theme.colors.surface,
      }}
      activeOpacity={0.8}
      onPress={() => {
        dispatch(incrementCounter(counter.id));
      }}
      onLongPress={() => {
        setEditMode(prev => !prev);
      }}>
      <View style={styles.header}>
        <Icon source={counter.icon} size={20} />
        <Text
          style={{color: counter.color?.textColor || theme.colors.secondary}}
          variant="titleLarge">
          {counter.name}
        </Text>
      </View>
      <Text
        style={{color: counter.color?.textColor || theme.colors.secondary}}
        variant="displayLarge">
        {counter.value}
      </Text>
      <Text
        style={{color: counter.color?.textColor || theme.colors.secondary}}
        variant="bodySmall">
        꾹 눌러 수정하기
      </Text>
    </FullCenteredTouchableOpacity>
  );
}
