import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppSelector from '@/common/hooks/useAppSelector';
import {selectDarkMode, setDarkMode} from '@/store/appConfig/appConfigSlice';
import {StyleSheet, View} from 'react-native';
import {Icon, RadioButton} from 'react-native-paper';

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default function LandingDarkModeRadioGroup() {
  const darkMode = useAppSelector(selectDarkMode);
  const dispatch = useAppDispatch();

  return (
    <RadioButton.Group
      onValueChange={value => {
        if (value === 'dark') {
          dispatch(setDarkMode(true));
          return;
        }
        if (value === 'light') {
          dispatch(setDarkMode(false));
          return;
        }
      }}
      value={darkMode ? 'dark' : 'light'}>
      <View style={styles.radioButton}>
        <RadioButton.Item
          value="dark"
          label="다크 모드"
          leadingIcon={<Icon source="lightbulb-off-outline" size={20} />}
        />
      </View>
      <View style={styles.radioButton}>
        <RadioButton.Item
          value="light"
          label="라이트 모드"
          leadingIcon={<Icon source="lightbulb-on" size={20} />}
        />
      </View>
    </RadioButton.Group>
  );
}
