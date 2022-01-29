import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import Left from '../../assets/images/back-arrow.svg';
import Right from '../../assets/images/forward-arrow.svg';
import {useAction} from '../../hooks/useAction';
import CreateTask from '../CreateTask/CreateTask';
import {showList} from './taskListLogic';
import './taskList.scss';

const TaskList = () => {
	const {tasks, currentPage, totalPage} = useSelector(
		(state: RootState) => state.tasks,
	);
	const {incrementPage, decrementPage, fetchSort} = useAction();

	return (
		<div className='taskList'>
			<div className='taskList__sort'>
				<button
					onClick={() => fetchSort(currentPage, 'username', 'asc')}
					className='taskList__sort-button'>
					username asc
				</button>
				<button
					onClick={() => fetchSort(currentPage, 'username', 'desc')}
					className='taskList__sort-button'>
					username desc
				</button>
				<button
					onClick={() => fetchSort(currentPage, 'email', 'asc')}
					className='taskList__sort-button'>
					email asc
				</button>
				<button
					onClick={() => fetchSort(currentPage, 'username', 'desc')}
					className='taskList__sort-button'>
					email desc
				</button>
				<button
					onClick={() => fetchSort(currentPage, 'status', 'asc')}
					className='taskList__sort-button'>
					status asc
				</button>
				<button
					onClick={() => fetchSort(currentPage, 'status', 'desc')}
					className='taskList__sort-button'>
					status desc
				</button>
			</div>
			<div className='taskList__admin'>
				<button className='taskList__admin-button'>ADMIN</button>
			</div>
			{showList(tasks)}

			<CreateTask />
			<div className='taskList__totalPage'>
				<strong>Total page:</strong> {totalPage}
			</div>
			<div className='taskList__pagination'>
				<div className='taskList__pagination-arrow'>
					<Left onClick={() => decrementPage(currentPage)} />
				</div>
				<div className='taskList__pagination-current'>{currentPage}</div>
				<div className='taskList__pagination-arrow'>
					<Right onClick={() => incrementPage(currentPage, totalPage)} />
				</div>
			</div>
		</div>
	);
};

export default TaskList;
