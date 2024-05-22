import useAppDispatch from '@/common/hooks/useAppDispatch';
import useAppSelector from '@/common/hooks/useAppSelector';
import {
  selectDarkMode,
  selectSimpleMode,
  toggleDarkMode,
  toggleSimpleMode,
} from '@/store/appConfig/appConfigSlice';
import {removeAllCounters} from '@/store/counter/counterSlice';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, List, Portal, Switch, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 10,
  },
});

export type SettingMainScreenParams = undefined;

export default function SettingMainScreen() {
  const dispatch = useAppDispatch();
  const simpleMode = useAppSelector(selectSimpleMode);
  const darkMode = useAppSelector(selectDarkMode);
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <List.Section>
        <List.Subheader>리셋</List.Subheader>
        <List.Item
          style={styles.listItem}
          title="전체 삭제"
          left={() => <List.Icon icon="delete" />}
          description="모든 카운터를 삭제합니다."
          onPress={() => {
            setVisible(true);
          }}
        />
        <List.Subheader>모드</List.Subheader>
        <List.Item
          style={styles.listItem}
          title="다크 모드"
          left={() => <List.Icon icon="theme-light-dark" />}
          description={`다크 모드를 활성화합니다. (현재 모드: ${
            darkMode ? '다크' : '라이트'
          })`}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={() => {
                dispatch(toggleDarkMode());
              }}
            />
          )}
        />
        <List.Item
          style={styles.listItem}
          title="상세 모드 활성화"
          left={() => <List.Icon icon="cog" />}
          description={`상세 모드를 활성화합니다. (현재 모드: ${
            simpleMode ? '간단' : '상세'
          })`}
          right={() => (
            <Switch
              value={!simpleMode}
              onValueChange={() => {
                dispatch(toggleSimpleMode());
              }}
            />
          )}
        />
        <List.Subheader>앱 정보</List.Subheader>
        <List.Item
          style={styles.listItem}
          title="버전"
          left={() => <List.Icon icon="information" />}
          description="1.0.0"
        />
        <List.Item
          style={styles.listItem}
          title="개발자"
          left={() => <List.Icon icon="account" />}
          description="비버코딩"
        />
        <List.Item
          style={styles.listItem}
          title="문의"
          left={() => <List.Icon icon="email" />}
        />
        <List.Item
          style={styles.listItem}
          title="오픈소스 라이센스"
          left={() => <List.Icon icon="file" />}
        />
      </List.Section>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}>
          <Dialog.Content>
            <Text variant="bodyMedium">모든 카운터를 지웁니다.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                dispatch(removeAllCounters());
                setVisible(false);
              }}>
              모든 카운터 삭제
            </Button>
            <Button
              onPress={() => {
                setVisible(false);
              }}>
              취소
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
