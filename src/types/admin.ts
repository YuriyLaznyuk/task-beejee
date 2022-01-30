export interface IAdmin {
	modal: boolean;
	username: string;
	password: string;
}
export enum AdminActionType {
	ADMIN_MODAL = 'ADMIN_MODAL',
}

export type AdminModal = {
	type: AdminActionType.ADMIN_MODAL;
	payload: boolean;
};

export type AdminAction = AdminModal;
