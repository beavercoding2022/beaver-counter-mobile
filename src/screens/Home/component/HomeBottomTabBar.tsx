import useAppSelector from '@/common/hooks/useAppSelector';
import {CounterDetailScreenParams} from '@/screens/Home/CounterDetailScreen';
import {selectCounter} from '@/store/counter/counterSlice';
import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';

export type HomeBottomTabBarProps = BottomTabBarProps;

export default function HomeBottomTabBar(props: HomeBottomTabBarProps) {
  const detailScreenId = (
    props.state.routes.find(route => route.name === 'CounterDetailScreen')
      ?.params as CounterDetailScreenParams
  )?.id;

  const counter = useAppSelector(state => selectCounter(state, detailScreenId));

  const routes = props.state.routes.filter(route => {
    if (route.name === 'CounterDetailScreen') {
      return !!counter;
    }

    return true;
  });

  const index = routes.findIndex(
    route => route.name === props.state.routes[props.state.index].name,
  );

  return (
    <BottomTabBar
      {...props}
      state={{
        ...props.state,
        routes,
        index,
      }}
    />
  );
}
