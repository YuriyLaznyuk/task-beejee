import {AdminAction, AdminActionType, IAdmin} from '../../types/admin';

const defaultState: IAdmin = {
	modal: false,
	password: '',
	username: '',
	isAdmin: false,
	token: '',
};
export const adminReducer = (state = defaultState, action: AdminAction) => {
	switch (action.type) {
		case AdminActionType.ADMIN_MODAL:
			return {...state, modal: action.payload};
		case AdminActionType.ADMIN_INPUT:
			return {
				...state,
				password: action.payload.password,
				username: action.payload.username,
			};
		case AdminActionType.ADMIN_LOGIN:
			return {
				...state,
				token: action.payload.token,
				isAdmin: action.payload.isAdmin,
			};

		default:
			return state;
	}
};
