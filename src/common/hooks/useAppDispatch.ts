import {AppDispatch} from '@/store/store';
import {useDispatch} from 'react-redux';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
