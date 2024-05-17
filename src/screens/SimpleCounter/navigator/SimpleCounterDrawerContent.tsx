import {
  DrawerContent,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

export type SimpleCounterDrawerContentProps = DrawerContentComponentProps;

export default function SimpleCounterDrawerContent(
  props: SimpleCounterDrawerContentProps,
) {
  return <DrawerContent {...props} />;
}
