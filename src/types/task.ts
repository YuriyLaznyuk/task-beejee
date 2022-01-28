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
}

export type FetchTask = {
	type: TaskActionType.FETCH_TASK;
	payload: {
		tasks: ITask[];
		totalTask: number;
	};
};

export type TaskAction = FetchTask;
