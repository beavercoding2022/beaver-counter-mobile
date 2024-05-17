import FullCenteredView from '@/common/components/FullCenteredView';
import useAppNavigation from '@/common/hooks/useAppNavigation';
import useAppSelector from '@/common/hooks/useAppSelector';
import LandingDarkModeRadioGroup from '@/screens/Landing/components/LandingDarkModeRadioGroup';
import LandingSimpleModeRadioGroup from '@/screens/Landing/components/LandingSimpleModeRadioGroup';
import {selectSimpleMode} from '@/store/appConfig/appConfigSlice';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mid: {
    flex: 2,
    gap: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type LandingWelcomeScreenParams = undefined;

export const LandingWelcomeScreenOptions: NativeStackNavigationOptions = {
  headerTitle: '환영합니다',
};

export default function LandingWelcomeScreen() {
  const navigation = useAppNavigation();
  const simpleMode = useAppSelector(selectSimpleMode);

  const handlePressNext = React.useCallback(() => {
    if (simpleMode) {
      navigation.navigate('SimpleCounterDrawerNavigator', {
        screen: 'SimpleCounterListScreen',
      });
      return;
    }

    if (!simpleMode) {
      navigation.navigate('ComplexCounterDrawerNavigator', {
        screen: 'ComplexCounterListScreen',
      });
      return;
    }
  }, [simpleMode, navigation]);

  return (
    <FullCenteredView>
      <View style={styles.top}>
        <Text variant="titleLarge">아래에서 모드를 선택해주세요.</Text>
      </View>
      <View style={styles.mid}>
        <LandingDarkModeRadioGroup />
        <LandingSimpleModeRadioGroup />
      </View>
      <View style={styles.bottom}>
        <Button mode="contained" onPress={handlePressNext}>
          다음
        </Button>
      </View>
    </FullCenteredView>
  );
}
