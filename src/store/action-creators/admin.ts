import {Dispatch} from 'redux';
import {AdminAction, AdminActionType} from '../../types/admin';

export const adminModal =
	(payload: boolean) => (dispatch: Dispatch<AdminAction>) => {
		dispatch({type: AdminActionType.ADMIN_MODAL, payload: payload});
	};
