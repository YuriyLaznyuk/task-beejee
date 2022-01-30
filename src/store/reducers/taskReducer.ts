import {TaskAction, TaskActionType, TaskState} from '../../types/task';

const initialState: TaskState = {
	currentPage: 1,
	tasks: [],
	totalPage: 1,
	totalTask: 1,
	email: '',
	text: '',
	username: '',
	ascEmail: true,
	ascName: true,
	ascStatus: true,
	initialText: '',
	editText: '',
	editStatus: 0,
	editId: 0,
	edited: false,
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
		case TaskActionType.EMAIL_ASC:
			return {...state, ascEmail: action.payload};
		case TaskActionType.NAME_ASC:
			return {...state, ascName: action.payload};
		case TaskActionType.STATUS_ASC:
			return {...state, ascStatus: action.payload};
		case TaskActionType.REQUIRED_PAGE:
			return {...state, currentPage: action.payload};
		case TaskActionType.EDIT_TASK:
			return {
				...state,
				editText: action.payload,
			};
		case TaskActionType.ACTIVE_ID:
			return {...state, editId: action.payload};
		case TaskActionType.INITIAL_TEXT:
			return {...state, initialText: action.payload};
		case TaskActionType.EDITED_TASK:
			return {...state, edited: state.initialText === state.editText};
		case TaskActionType.EDIT_STATUS:
			return {...state, editStatus: action.payload};
		default:
			return state;
	}
};
