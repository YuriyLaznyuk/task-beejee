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
			field === 'username' &&
				direction === 'desc' &&
				dispatch({type: TaskActionType.NAME_ASC, payload: true});
			field === 'username' &&
				direction === 'asc' &&
				dispatch({type: TaskActionType.NAME_ASC, payload: false});

			field === 'email' &&
				direction === 'desc' &&
				dispatch({type: TaskActionType.EMAIL_ASC, payload: true});

			field === 'email' &&
				direction === 'asc' &&
				dispatch({type: TaskActionType.EMAIL_ASC, payload: false});

			field === 'status' &&
				direction === 'desc' &&
				dispatch({type: TaskActionType.STATUS_ASC, payload: true});
			field === 'status' &&
				direction === 'asc' &&
				dispatch({type: TaskActionType.STATUS_ASC, payload: false});
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
					if (data.status === 'error') {
						alert(
							`email: ${data.message.email} text: ${data.message.text} username: ${data.message.username}`,
						);
					}
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

export const requiredPage =
	(page: number) => (dispatch: Dispatch<TaskAction>) => {
		dispatch({type: TaskActionType.REQUIRED_PAGE, payload: page});
	};
export const activeId =
	(id: number, text: string, status: number) =>
	(dispatch: Dispatch<TaskAction>) => {
		let checked = false;
		checked = status === 10 || status == 11;
		dispatch({type: TaskActionType.ACTIVE_ID, payload: id});
		dispatch({
			type: TaskActionType.EDIT_TASK,
			payload: text,
		});
		dispatch({type: TaskActionType.INITIAL_TEXT, payload: text});
		dispatch({type: TaskActionType.EDIT_STATUS, payload: status});
		dispatch({type: TaskActionType.ACTIVE_ID_CHECKED, payload: checked});
	};
export const editTask =
	(payload: string) => (dispatch: Dispatch<TaskAction>) => {
		dispatch({type: TaskActionType.EDIT_TASK, payload});
	};
export const changeChecked = () => (dispatch: Dispatch<TaskAction>) => {
	dispatch({type: TaskActionType.EDIT_CHECKED});
};

export const editedTask = () => (dispatch: Dispatch<TaskAction>) => {
	dispatch({type: TaskActionType.EDITED_TASK});
};

export const changeStatus =
	(isChecked: boolean, edited: boolean) => (dispatch: Dispatch<TaskAction>) => {
		let status = 0;
		if (isChecked === false && edited === false) {
			status = 1;
		}
		if (isChecked === true && edited === false) {
			status = 11;
		}
		if (isChecked === true && edited === true) {
			status = 10;
		}
		if (isChecked === false && edited === true) {
			status = 0;
		}
		dispatch({type: TaskActionType.EDIT_STATUS, payload: status});
	};

export const postEditedTask = async (
	text: string,
	status: number,
	token: string,
	id: number,
) => {
	const formData = new FormData();
	formData.append('text', text);
	formData.append('status', String(status));
	formData.append('token', token);
	try {
		$.ajax({
			url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=Name`,
			crossDomain: true,
			method: 'POST',
			mimeType: 'multipart/form-data',
			contentType: false,
			processData: false,
			data: formData,
			dataType: 'json',
			success: function (data) {
				console.log(data);
			},
		});
	} catch (e) {
		console.log('Error ', (e as Error).message);
	}
};
