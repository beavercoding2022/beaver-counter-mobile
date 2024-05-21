import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export function getIconsList() {
  return Icons.getRawGlyphMap();
}

export function getRandomIconFromList() {
  const iconsList = getIconsList();
  const iconsKeys = Object.keys(iconsList);
  const randomIndex = Math.floor(Math.random() * iconsKeys.length);
  return iconsKeys[randomIndex];
}
