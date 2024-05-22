import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {FlatList, Linking} from 'react-native';
import {List} from 'react-native-paper';

export type LicensesScreenParams = undefined;

export const LicensesScreenOptions: NativeStackNavigationOptions = {
  title: '오픈소스 라이선스',
  headerBackVisible: true,
};

export default function LicensesScreen() {
  const jsonfile = require('../../../../assets/licenses.json');

  const licenses = Object.keys(jsonfile).map(key => {
    const license = jsonfile[key];
    const split = (() => {
      const splitByAt = key.split('@');
      const last = splitByAt[splitByAt.length - 1];
      const first = splitByAt.slice(0, splitByAt.length - 1).join('@');
      return {
        version: last,
        name: first,
      };
    })();
    return {
      name: split.name,
      licenses: license.licenses,
      repository: license.repository,
      licenseUrl: license.licenseUrl,
      parents: license.parents,
      version: split.version,
    };
  });
  return (
    <List.Section>
      <FlatList
        data={licenses}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <List.Item
            title={`(${item.licenses}) ${item.name}`}
            description={item.version}
            onPress={() => Linking.openURL(item.licenseUrl)}
          />
        )}
      />
    </List.Section>
  );
}
