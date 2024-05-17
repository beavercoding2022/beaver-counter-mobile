import {RootState} from '@/store/store';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
