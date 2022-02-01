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
	taskEffect: boolean;
	currentPage: number;
	totalPage: number;
	username: string;
	email: string;
	text: string;
	ascName: boolean;
	ascEmail: boolean;
	ascStatus: boolean;
	editStatus: number;
	initialText: string;
	editText: string;
	editId: number;
	isChecked: boolean;
	edited: boolean;
	sortField: string;
	sortDirection: string;
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
	EDIT_TASK = 'EDIT_TASK',
	EDIT_STATUS = 'EDIT_STATUS',
	ACTIVE_ID = 'ACTIVE_ID',
	INITIAL_TEXT = 'INITIAL_TEXT',
	EDITED_TASK = 'EDITED_TASK',
	EDIT_CHECKED = 'EDIT_CHECKED',
	ACTIVE_ID_CHECKED = 'ACTIVE_ID_CHECKED',
	ACTIVE_SORT = 'ACTIVE_SORT',
	TASK_EFFECT = 'TASK_EFFECT',
	INITIAL_SESSION_STORAGE = 'INITIAL_SESSION_STORAGE',
}

export type InitialSessionStorage = {
	type: TaskActionType.INITIAL_SESSION_STORAGE;
	payload: {
		field: string;
		direction: string;
		page: number;
		email: boolean;
		name: boolean;
		status: boolean;
	};
};

export type ActiveSort = {
	type: TaskActionType.ACTIVE_SORT;
	payload: {
		field: string;
		direction: string;
	};
};

export type ActiveIdChecked = {
	type: TaskActionType.ACTIVE_ID_CHECKED;
	payload: boolean;
};

export type EditChecked = {
	type: TaskActionType.EDIT_CHECKED;
};

export type EditStatus = {
	type: TaskActionType.EDIT_STATUS;
	payload: number;
};
export type TaskEffect = {
	type: TaskActionType.TASK_EFFECT;
};

export type EditedTask = {
	type: TaskActionType.EDITED_TASK;
};
export type InitialText = {
	type: TaskActionType.INITIAL_TEXT;
	payload: string;
};
export type ActiveId = {
	type: TaskActionType.ACTIVE_ID;
	payload: number;
};

export type EditTask = {
	type: TaskActionType.EDIT_TASK;
	payload: string;
};
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
	| RequiredPage
	| EditTask
	| ActiveId
	| InitialText
	| EditedTask
	| EditStatus
	| EditChecked
	| ActiveIdChecked
	| ActiveSort
	| TaskEffect
	| InitialSessionStorage;
