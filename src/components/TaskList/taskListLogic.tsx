import {ITask} from '../../types/task';
import React from 'react';

export const showList = (tasks: ITask[], isAdmin: boolean) => {
	return tasks.length > 0 ? (
		tasks.map((task) => (
			<div className='taskList__task' key={task.id}>
				<div className='taskList__task-edit'>
					{isAdmin && (
						<button className='taskList__task-edit-button'>Edit</button>
					)}
				</div>
				<div>
					<strong>Name:</strong> {task.username}
				</div>
				<div>
					<strong>Email:</strong> {task.email}
				</div>
				<div>
					<strong>Status:</strong> {task.status}
				</div>
			</div>
		))
	) : (
		<div>No task</div>
	);
};
