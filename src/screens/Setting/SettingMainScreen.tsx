import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

const FolderIcon = () => <List.Icon icon="folder" />;

const styles = StyleSheet.create({});

export type SettingMainScreenParams = undefined;

export default function SettingMainScreen() {
  return (
    <List.Section>
      <List.Subheader>Some title</List.Subheader>
      <List.Item title="First Item" left={FolderIcon} />
    </List.Section>
  );
}
