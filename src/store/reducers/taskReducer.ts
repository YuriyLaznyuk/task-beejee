import {TaskAction, TaskActionType, TaskState} from '../../types/task';

const initialState: TaskState = {
	currentPage: 1,
	tasks: [],
	totalPage: 1,
	totalTask: 1,
	email: '',
	text: '',
	username: '',
};

export const taskReducer = (state = initialState, action: TaskAction) => {
	switch (action.type) {
		case TaskActionType.FETCH_TASK:
			const pages = Math.ceil(action.payload.totalTask / 3);
			return {
				...state,
				tasks: action.payload.tasks,
				totalTask: action.payload.totalTask,
				totalPage: pages,
			};
		case TaskActionType.INCREMENT_PAGE:
			return {...state, currentPage: state.currentPage + 1};
		case TaskActionType.DECREMENT_PAGE:
			return {...state, currentPage: state.currentPage - 1};
		case TaskActionType.FETCH_SORT:
			const _pages = Math.ceil(action.payload.totalTask / 3);
			return {
				...state,
				tasks: action.payload.tasks,
				totalTask: action.payload.totalTask,
				totalPage: _pages,
			};
		case TaskActionType.CREATE_TASK:
			return {
				...state,
				username: action.payload.username,
				email: action.payload.email,
				text: action.payload.text,
			};
		default:
			return state;
	}
};
