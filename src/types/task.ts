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
}

export enum TaskActionType {
	FETCH_TASK = 'FETCH_TASK',
	FETCH_SORT = 'FETCH_SORT',
	INCREMENT_PAGE = 'INCREMENT_PAGE',
	DECREMENT_PAGE = 'DECREMENT_PAGE',
	CREATE_TASK = 'CREATE_TASK',
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

export type TaskAction =
	| FetchTask
	| IncrementPage
	| DecrementPage
	| FetchSort
	| CreateTask;
