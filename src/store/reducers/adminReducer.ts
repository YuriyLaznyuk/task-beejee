import {AdminAction, AdminActionType, IAdmin} from '../../types/admin';

const defaultState: IAdmin = {
	modal: false,
	password: '',
	username: '',
};
export const adminReducer = (state = defaultState, action: AdminAction) => {
	switch (action.type) {
		case AdminActionType.ADMIN_MODAL:
			return {...state, modal: action.payload};
		default:
			return state;
	}
};
