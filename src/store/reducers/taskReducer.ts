import {TaskAction, TaskActionType, TaskState} from '../../types/task';

const initialState: TaskState = {
	currentPage: 1,
	tasks: [],
	totalPage: 1,
	totalTask: 1,
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
		default:
			return state;
	}
};
