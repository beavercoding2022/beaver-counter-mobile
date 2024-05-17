import useAppSelector from '@/common/hooks/useAppSelector';
import RootStackNavigator from '@/screens/RootStackNavigator';
import {selectAppConfig} from '@/store/appConfig/appConfigSlice';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export default function AppScreenContainer() {
  const {darkMode} = useAppSelector(selectAppConfig);

  return (
    <PaperProvider theme={darkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer
        theme={darkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
        <RootStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
