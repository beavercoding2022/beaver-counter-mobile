import {StyleSheet, View, ViewProps} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type FullCenteredViewProps = ViewProps;

export default function FullCenteredView(
  props: React.PropsWithChildren<FullCenteredViewProps>,
) {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
}
