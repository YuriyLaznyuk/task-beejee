import {combineReducers} from 'redux';
import {taskReducer} from './taskReducer';
import {adminReducer} from './adminReducer';

export const rootReducer = combineReducers({
	tasks: taskReducer,
	admin: adminReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
