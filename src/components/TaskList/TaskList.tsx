import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import {ITask} from '../../types/task';
import Left from '../../assets/images/back-arrow.svg';
import Right from '../../assets/images/forward-arrow.svg';
import './taskList.scss';

const TaskList = () => {
	const {tasks, currentPage, totalPage} = useSelector(
		(state: RootState) => state.tasks,
	);
	const showList = (tasks: ITask[]) => {
		return tasks.length > 0 ? (
			tasks.map((task) => (
				<div className='taskList__task' key={task.id}>
					<div className='taskList__task-edit'>
						<button className='taskList__task-edit-button'>Edit</button>
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

	return (
		<div className='taskList'>
			<div className='taskList__sort'>
				<button className='taskList__sort-button'>Sort by Name</button>
				<button className='taskList__sort-button'>Sort by Email</button>
				<button className='taskList__sort-button'>Sort by Status</button>
			</div>
			<div className='taskList__admin'>
				<button className='taskList__admin-button'>ADMIN</button>
			</div>
			{showList(tasks)}
			<div className='taskList__totalPage'>
				<strong>Total page:</strong> {totalPage}
			</div>
			<div className='taskList__pagination'>
				<div className='taskList__pagination-arrow'>
					<Left />
				</div>
				<div className='taskList__pagination-current'>{currentPage}</div>
				<div className='taskList__pagination-arrow'>
					<Right />
				</div>
			</div>
		</div>
	);
};

export default TaskList;
