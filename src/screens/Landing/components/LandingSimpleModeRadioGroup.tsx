import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppSelector from '@/common/hooks/useAppSelector';
import {
  selectSimpleMode,
  setSimpleMode,
} from '@/store/appConfig/appConfigSlice';
import {StyleSheet, View} from 'react-native';
import {Icon, RadioButton, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});

export default function LandingSimpleModeRadioGroup() {
  const simpleMode = useAppSelector(selectSimpleMode);
  const dispatch = useAppDispatch();

  return (
    <RadioButton.Group
      onValueChange={value => {
        if (value === 'simple') {
          dispatch(setSimpleMode(true));
          return;
        }
        if (value === 'complex') {
          dispatch(setSimpleMode(false));
          return;
        }
      }}
      value={simpleMode ? 'simple' : 'complex'}>
      <View style={styles.radioButton}>
        <RadioButton.Item
          value="simple"
          label="간단 모드"
          leadingIcon={<Icon source="circle-slice-1" size={20} />}
        />
      </View>
      <View style={styles.radioButton}>
        <RadioButton.Item
          value="complex"
          label="상세 모드"
          leadingIcon={<Icon source="circle-multiple-outline" size={20} />}
        />
      </View>
    </RadioButton.Group>
  );
}
