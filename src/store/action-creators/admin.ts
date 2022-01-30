import {Dispatch} from 'redux';
import {AdminAction, AdminActionType, IAdminInput} from '../../types/admin';
import $ from 'jquery';

export const adminModal =
	(payload: boolean) => (dispatch: Dispatch<AdminAction>) => {
		dispatch({type: AdminActionType.ADMIN_MODAL, payload: payload});
	};
export const inputAdmin =
	({username, password}: IAdminInput) =>
	(dispatch: Dispatch<AdminAction>) => {
		dispatch({
			type: AdminActionType.ADMIN_INPUT,
			payload: {username, password},
		});
	};

export const adminLogin =
	(username: string, password: string) =>
	async (dispatch: Dispatch<AdminAction>) => {
		try {
			const formData = new FormData();
			formData.append('username', username);
			formData.append('password', password);
			await $.ajax({
				url: `https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Name`,
				crossDomain: true,
				method: 'POST',
				mimeType: 'multipart/form-data',
				contentType: false,
				processData: false,
				data: formData,
				dataType: 'json',
				success: (data) => {
					console.log(data);
					dispatch({
						type: AdminActionType.ADMIN_LOGIN,
						payload: {isAdmin: true, token: data.message.token},
					});
					dispatch({
						type: AdminActionType.ADMIN_INPUT,
						payload: {password: '', username: ''},
					});
					dispatch({type: AdminActionType.ADMIN_MODAL, payload: false});
				},
			});
		} catch (e) {
			console.log('Error: ', (e as Error).message);
			dispatch({
				type: AdminActionType.ADMIN_LOGIN,
				payload: {isAdmin: false, token: ''},
			});
		}
	};
