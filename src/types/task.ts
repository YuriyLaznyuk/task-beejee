export interface ITask {
	id: number;
	username: string;
	email: string;
	text: string;
	status: number;
	image_path?: string;
}
export interface TaskState {
	tasks: ITask[];
	totalTask: number;
	currentPage: number;
	totalPage: number;
}

export enum TaskActionType {
	FETCH_TASK = 'FETCH_TASK',
	INCREMENT_PAGE = 'INCREMENT_PAGE',
	DECREMENT_PAGE = 'DECREMENT_PAGE',
}

export type FetchTask = {
	type: TaskActionType.FETCH_TASK;
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

export type TaskAction = FetchTask | IncrementPage | DecrementPage;
