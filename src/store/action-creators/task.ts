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
