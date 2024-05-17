import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type FullCenteredViewProps = {};

export default function FullCenteredView(props: React.PropsWithChildren) {
  return <View style={styles.container}>{props.children}</View>;
}
