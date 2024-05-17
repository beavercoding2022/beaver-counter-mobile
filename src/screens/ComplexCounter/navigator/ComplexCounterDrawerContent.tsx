import {
  DrawerContent,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

export type ComplexCounterDrawerContentProps = DrawerContentComponentProps;

export default function ComplexCounterDrawerContent(
  props: ComplexCounterDrawerContentProps,
) {
  return <DrawerContent {...props} />;
}
