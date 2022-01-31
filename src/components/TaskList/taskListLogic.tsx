import {ITask} from '../../types/task';
import React from 'react';
import {postEditedTask} from '../../store/action-creators/task';

export const showList = (
	tasks: ITask[],
	isAdmin: boolean,
	activeId: (id: number, text: string, status: number) => void,
	editId: number,
	editTask: (text: string) => void,
	editText: string,
	editStatus: number,
	token: string,
	isChecked: boolean,
	changeChecked: () => void,
) => {
	return tasks.length > 0 ? (
		tasks.map((task) => (
			<div className='taskList__task' key={task.id}>
				<div className='taskList__task-edit'>
					{isAdmin && (
						<button
							onClick={() => activeId(task.id, task.text, task.status)}
							className='taskList__task-edit-button'>
							Edit
						</button>
					)}
				</div>
				<div>
					<strong>Name: </strong> {task.username}
				</div>
				<div>
					<strong>Email: </strong> {task.email}
				</div>
				{!isAdmin && (
					<div>
						<strong>Status: </strong> {task.status}
					</div>
				)}
				<div>
					<strong>Text: </strong>
					{!isAdmin && task.text}
					{isAdmin && (
						<span>
							{editId !== task.id ? (
								<span>{task.text}</span>
							) : (
								<input
									onChange={(e) => editTask(e.target.value)}
									type='text'
									defaultValue={task.text}
								/>
							)}
						</span>
					)}
				</div>

				{isAdmin && (
					<span>
						<strong>Status: </strong>
						{editId !== task.id ? (
							<span>{task.status}</span>
						) : (
							<input
								onChange={() => changeChecked()}
								type='checkbox'
								checked={isChecked}
							/>
						)}
					</span>
				)}
				<div className='taskList__task-edit'>
					{isAdmin && editId === task.id && (
						<button
							onClick={() =>
								postEditedTask(editText, editStatus, token, task.id)
							}
							className='taskList__task-edit-button'>
							SEND
						</button>
					)}
				</div>
			</div>
		))
	) : (
		<div>No task</div>
	);
};
