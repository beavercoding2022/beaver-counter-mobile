import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type FullCenteredTouchableOpacityProps = TouchableOpacityProps;

export default function FullCenteredTouchableOpacity(
  props: React.PropsWithChildren<FullCenteredTouchableOpacityProps>,
) {
  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
}
