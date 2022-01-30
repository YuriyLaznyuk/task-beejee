export interface ITask {
	id: number;
	username: string;
	email: string;
	text: string;
	status: number;
	image_path?: string;
}
export interface ICreate {
	username: string;
	email: string;
	text: string;
}
export interface TaskState {
	tasks: ITask[];
	totalTask: number;
	currentPage: number;
	totalPage: number;
	username: string;
	email: string;
	text: string;
	ascName: boolean;
	ascEmail: boolean;
	ascStatus: boolean;
}

export enum TaskActionType {
	FETCH_TASK = 'FETCH_TASK',
	FETCH_SORT = 'FETCH_SORT',
	INCREMENT_PAGE = 'INCREMENT_PAGE',
	DECREMENT_PAGE = 'DECREMENT_PAGE',
	CREATE_TASK = 'CREATE_TASK',
	NAME_ASC = 'NAME_ASC',
	EMAIL_ASC = 'EMAIL_ASC',
	STATUS_ASC = 'STATUS_ASC',
	REQUIRED_PAGE = 'REQUIRED_PAGE',
}
export type CreateTask = {
	type: TaskActionType.CREATE_TASK;
	payload: {
		username: string;
		email: string;
		text: string;
	};
};

export type FetchTask = {
	type: TaskActionType.FETCH_TASK;
	payload: {
		tasks: ITask[];
		totalTask: number;
	};
};

export type FetchSort = {
	type: TaskActionType.FETCH_SORT;
	payload: {
		tasks: ITask[];
		totalTask: number;
	};
};

export type IncrementPage = {
	type: TaskActionType.INCREMENT_PAGE;
};

export type DecrementPage = {
	type: TaskActionType.DECREMENT_PAGE;
};

export type NameAsc = {
	type: TaskActionType.NAME_ASC;
	payload: boolean;
};

export type EmailAsc = {
	type: TaskActionType.EMAIL_ASC;
	payload: boolean;
};

export type StatusAsc = {
	type: TaskActionType.STATUS_ASC;
	payload: boolean;
};

export type RequiredPage = {
	type: TaskActionType.REQUIRED_PAGE;
	payload: number;
};
export type TaskAction =
	| FetchTask
	| IncrementPage
	| DecrementPage
	| FetchSort
	| CreateTask
	| NameAsc
	| EmailAsc
	| StatusAsc
	| RequiredPage;
