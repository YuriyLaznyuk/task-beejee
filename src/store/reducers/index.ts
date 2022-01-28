import {combineReducers} from 'redux';
import {taskReducer} from './taskReducer';

export const rootReducer = combineReducers({
	tasks: taskReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
