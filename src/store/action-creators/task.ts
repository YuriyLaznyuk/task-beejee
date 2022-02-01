import {Dispatch} from 'redux';
import {ICreate, TaskAction, TaskActionType} from '../../types/task';
import $ from 'jquery';
import {AdminAction, AdminActionType} from '../../types/admin';

export const fetchTasks =
	(
		page: number,
		field: string,
		direction: string,
		email: boolean,
		name: boolean,
		status: boolean,
	) =>
	async (dispatch: Dispatch<TaskAction>) => {
		dispatch({
			type: TaskActionType.INITIAL_SESSION_STORAGE,
			payload: {
				page,
				direction,
				field,
				email,
				name,
				status,
			},
		});
		const url =
			field && direction
				? `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=yura&page=${page}&sort_field=${field}&sort_direction=${direction}`
				: `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=yura&page=${page}`;
		try {
			const response = await fetch(url);

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
			sessionStorage.setItem('page', String(currentPage + 1));
			dispatch({type: TaskActionType.INCREMENT_PAGE});
		}
	};

export const decrementPage =
	(currentPage: number) => (dispatch: Dispatch<TaskAction>) => {
		if (currentPage === 1) {
			return;
		} else {
			sessionStorage.setItem('page', String(currentPage - 1));
			dispatch({type: TaskActionType.DECREMENT_PAGE});
		}
	};

export const fetchSort =
	(page: number, field: string, direction: string) =>
	async (dispatch: Dispatch<TaskAction>) => {
		sessionStorage.setItem('field', field);
		sessionStorage.setItem('direction', direction);
		try {
			const response = await fetch(
				`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=yura&page=${page}&sort_field=${field}&sort_direction=${direction}`,
			);
			const json = await response.json();
			dispatch({
				type: TaskActionType.FETCH_SORT,
				payload: {
					tasks: json.message.tasks,
					totalTask: Number(json.message.total_task_count),
				},
			});
			dispatch({type: TaskActionType.ACTIVE_SORT, payload: {field, direction}});
			if (field === 'username' && direction === 'desc') {
				dispatch({type: TaskActionType.NAME_ASC, payload: true});
				sessionStorage.setItem('ascname', JSON.stringify(true));
			}
			if (field === 'username' && direction === 'asc') {
				dispatch({type: TaskActionType.NAME_ASC, payload: false});
				sessionStorage.setItem('ascname', JSON.stringify(false));
			}

			if (field === 'email' && direction === 'desc') {
				dispatch({type: TaskActionType.EMAIL_ASC, payload: true});
				sessionStorage.setItem('ascemail', JSON.stringify(true));
			}

			if (field === 'email' && direction === 'asc') {
				dispatch({type: TaskActionType.EMAIL_ASC, payload: false});
				sessionStorage.setItem('ascemail', JSON.stringify(false));
			}

			if (field === 'status' && direction === 'desc') {
				dispatch({type: TaskActionType.STATUS_ASC, payload: true});
				sessionStorage.setItem('ascstatus', JSON.stringify(true));
			}
			if (field === 'status' && direction === 'asc') {
				dispatch({type: TaskActionType.STATUS_ASC, payload: false});
				sessionStorage.setItem('ascstatus', JSON.stringify(false));
			}
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
				url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=yura',
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
						const email = data.message.email
							? `\n email: ${data.message.email}`
							: '';
						const text = data.message.text
							? `\n text: ${data.message.text}`
							: '';

						const username = data.message.username
							? `\n username: ${data.message.username}`
							: '';
						alert(
							` ${email} ${text} ${username} \n Task create: ${data.status}`,
						);
					} else {
						alert(`Task create: ${data.status}`);
						dispatch({type: TaskActionType.TASK_EFFECT});
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
		sessionStorage.setItem('page', String(page));
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

export const postEditedTask =
	(text: string, status: number, id: number) =>
	async (dispatch: Dispatch<AdminAction>) => {
		const token = localStorage.getItem('token');
		const formData = new FormData();
		formData.append('text', text);
		formData.append('status', String(status));
		formData.append('token', String(token));
		try {
			$.ajax({
				url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=yura`,
				crossDomain: true,
				method: 'POST',
				mimeType: 'multipart/form-data',
				contentType: false,
				processData: false,
				data: formData,
				dataType: 'json',
				success: function (data) {
					console.log(data);
					if (data.status === 'error') {
						alert(`${data.message.token} \n please log in`);
						dispatch({type: AdminActionType.ADMIN_LOGIN, payload: false});
					}
				},
			});
		} catch (e) {
			console.log('Error ', (e as Error).message);
		}
	};
