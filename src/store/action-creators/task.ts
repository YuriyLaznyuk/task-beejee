import {Dispatch} from 'redux';
import {TaskAction, TaskActionType} from '../../types/task';

export const fetchTasks =
	(page: number) => async (dispatch: Dispatch<TaskAction>) => {
		try {
			const response = await fetch(
				`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&page=${page}`,
			);

			const json = await response.json();
			dispatch({
				type: TaskActionType.FETCH_TASK,
				payload: {
					tasks: json.message.tasks,
					totalTask: Number(json.message.total_task_count),
				},
			});
		} catch (e) {
			console.log((e as Error).message);
		}
	};
export const incrementPage =
	(currentPage: number, totalPage: number) =>
	(dispatch: Dispatch<TaskAction>) => {
		if (currentPage === totalPage) {
			return;
		} else {
			dispatch({type: TaskActionType.INCREMENT_PAGE});
		}
	};

export const decrementPage =
	(currentPage: number) => (dispatch: Dispatch<TaskAction>) => {
		if (currentPage === 1) {
			return;
		} else {
			dispatch({type: TaskActionType.DECREMENT_PAGE});
		}
	};
