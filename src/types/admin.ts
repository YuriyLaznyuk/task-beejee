export interface IAdmin {
	modal: boolean;
	username: string;
	password: string;
	isAdmin: boolean;
}
export interface IAdminInput {
	username: string;
	password: string;
}
export enum AdminActionType {
	ADMIN_MODAL = 'ADMIN_MODAL',
	ADMIN_INPUT = 'ADMIN_INPUT',
	ADMIN_LOGIN = 'ADMIN_LOGIN',
}

export type AdminLogin = {
	type: AdminActionType.ADMIN_LOGIN;
	payload: boolean;
};
export type AdminInput = {
	type: AdminActionType.ADMIN_INPUT;
	payload: {
		username: string;
		password: string;
	};
};
export type AdminModal = {
	type: AdminActionType.ADMIN_MODAL;
	payload: boolean;
};

export type AdminAction = AdminModal | AdminInput | AdminLogin;
