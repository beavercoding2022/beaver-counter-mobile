import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import ColorPicker, {Panel3, Preview} from 'reanimated-color-picker';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 8,
  },
  resultColors: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  colorPickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  colorPicker: {
    flex: 1,
  },
});

export type DoubleColorPickerProps = {
  backgroundColor: string;
  textColor: string;
  initialBackgroundColor: string;
  initialTextColor: string;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
};

export default function DoubleColorPicker({
  backgroundColor,
  textColor,
  initialBackgroundColor,
  initialTextColor,
  setBackgroundColor,
  setTextColor,
}: DoubleColorPickerProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.resultColors, {backgroundColor: backgroundColor}]}>
        <Text variant="labelMedium" style={{color: textColor}}>
          글자 색 / 배경 색 변경
        </Text>
      </View>
      <View style={styles.colorPickersContainer}>
        <View style={styles.colorPicker}>
          <Text>글자 색</Text>
          <ColorPicker
            value={backgroundColor}
            onChange={color => {
              setBackgroundColor(color.hex);
            }}>
            <Preview />
            <Panel3 />
          </ColorPicker>
        </View>
        <View style={styles.colorPicker}>
          <Text>배경 색</Text>
          <ColorPicker
            value={textColor}
            onChange={color => {
              setTextColor(color.hex);
            }}>
            <Preview />
            <Panel3 />
          </ColorPicker>
        </View>
      </View>
      <Button
        onPress={() => {
          setBackgroundColor(initialBackgroundColor);
          setTextColor(initialTextColor);
        }}>
        초기화
      </Button>
    </View>
  );
}
