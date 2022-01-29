import {Dispatch} from 'redux';
import {ICreate, TaskAction, TaskActionType} from '../../types/task';
import $ from 'jquery';

export const fetchTasks =
	(page: number) => async (dispatch: Dispatch<TaskAction>) => {
		try {
			const response = await fetch(
				`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&page=${page}`,
			);

			const json = await response.json();
			dispatch({
				type: TaskActionType.FETCH_TASK,
				payload: {
					tasks: json.message.tasks,
					totalTask: Number(json.message.total_task_count),
				},
			});
		} catch (e) {
			console.log((e as Error).message);
		}
	};
export const incrementPage =
	(currentPage: number, totalPage: number) =>
	(dispatch: Dispatch<TaskAction>) => {
		if (currentPage === totalPage) {
			return;
		} else {
			dispatch({type: TaskActionType.INCREMENT_PAGE});
		}
	};

export const decrementPage =
	(currentPage: number) => (dispatch: Dispatch<TaskAction>) => {
		if (currentPage === 1) {
			return;
		} else {
			dispatch({type: TaskActionType.DECREMENT_PAGE});
		}
	};

export const fetchSort =
	(page: number, field: string, direction: string) =>
	async (dispatch: Dispatch<TaskAction>) => {
		try {
			const response = await fetch(
				`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&page=${page}&sort_field=${field}&sort_direction=${direction}`,
			);
			const json = await response.json();
			dispatch({
				type: TaskActionType.FETCH_SORT,
				payload: {
					tasks: json.message.tasks,
					totalTask: Number(json.message.total_task_count),
				},
			});
		} catch (e) {
			console.log((e as Error).message);
		}
	};
export const addField =
	({email, username, text}: ICreate) =>
	(dispatch: Dispatch<TaskAction>) => {
		dispatch({
			type: TaskActionType.CREATE_TASK,
			payload: {username: username, text: text, email: email},
		});
	};
export const postCreateTask =
	(username: string, email: string, text: string) =>
	async (dispatch: Dispatch<TaskAction>) => {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('email', email);
		formData.append('text', text);
		try {
			await $.ajax({
				url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Example',
				crossDomain: true,
				method: 'POST',
				mimeType: 'multipart/form-data',
				contentType: false,
				processData: false,
				data: formData,
				dataType: 'json',
				success: (data) => {
					console.log(data);
				},
			});
			dispatch({
				type: TaskActionType.CREATE_TASK,
				payload: {email: '', text: '', username: ''},
			});
		} catch (e) {
			console.log((e as Error).message);
		}
	};
