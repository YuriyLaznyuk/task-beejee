import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import Left from '../../assets/images/back-arrow.svg';
import Right from '../../assets/images/forward-arrow.svg';
import StartArrow from '../../assets/images/keyboard-left.svg';
import EndArrow from '../../assets/images/keyboard-right.svg';
import {useAction} from '../../hooks/useAction';
import CreateTask from '../CreateTask/CreateTask';
import {showList} from './taskListLogic';
import AdminModal from '../AdminModal/AdminModal';
import './taskList.scss';

const TaskList = () => {
	const {
		tasks,
		currentPage,
		totalPage,
		ascName,
		ascStatus,
		ascEmail,
		editId,
		editText,
		initialText,
		editStatus,
		isChecked,
		edited,
	} = useSelector((state: RootState) => state.tasks);
	const {
		incrementPage,
		decrementPage,
		fetchSort,
		requiredPage,
		adminModal,
		activeId,
		editTask,
		editedTask,
		adminLogout,
		changeChecked,
		changeStatus,
		postEditedTask,
	} = useAction();
	const {modal, isAdmin} = useSelector((state: RootState) => state.admin);
	useEffect(() => {
		editedTask();
		changeStatus(isChecked, edited);
	}, [editText, initialText, isChecked, edited]);
	return (
		<div className='taskList'>
			{modal && <AdminModal />}
			<div className='taskList__sort'>
				{ascName && (
					<button
						onClick={() => fetchSort(currentPage, 'username', 'asc')}
						className='taskList__sort-button'>
						username asc &#9650;
					</button>
				)}
				{!ascName && (
					<button
						onClick={() => fetchSort(currentPage, 'username', 'desc')}
						className='taskList__sort-button'>
						username desc &#9660;
					</button>
				)}
				{ascEmail && (
					<button
						onClick={() => fetchSort(currentPage, 'email', 'asc')}
						className='taskList__sort-button'>
						email asc &#9650;
					</button>
				)}
				{!ascEmail && (
					<button
						onClick={() => fetchSort(currentPage, 'email', 'desc')}
						className='taskList__sort-button'>
						email desc &#9660;
					</button>
				)}
				{ascStatus && (
					<button
						onClick={() => fetchSort(currentPage, 'status', 'asc')}
						className='taskList__sort-button'>
						status asc &#9650;
					</button>
				)}
				{!ascStatus && (
					<button
						onClick={() => fetchSort(currentPage, 'status', 'desc')}
						className='taskList__sort-button'>
						status desc &#9660;
					</button>
				)}
			</div>
			<div className='taskList__admin'>
				{!isAdmin && (
					<button
						onClick={() => adminModal(true)}
						className='taskList__admin-button'>
						ADMIN
					</button>
				)}
				{isAdmin && (
					<button className='taskList__admin-button' onClick={adminLogout}>
						LOGOUT
					</button>
				)}
			</div>
			{showList(
				tasks,
				isAdmin,
				activeId,
				editId,
				editTask,
				editText,
				editStatus,
				isChecked,
				changeChecked,
				postEditedTask,
			)}
			<CreateTask />
			<div className='taskList__totalPage'>
				<strong>Total page:</strong> {totalPage}
			</div>
			<div className='taskList__pagination'>
				<div className='taskList__pagination-arrow'>
					<span title={`page: 1`}>
						<Left onClick={() => requiredPage(1)} />
					</span>
					<StartArrow onClick={() => decrementPage(currentPage)} />
				</div>
				<div className='taskList__pagination-current'>{currentPage}</div>
				<div className='taskList__pagination-arrow'>
					<EndArrow onClick={() => incrementPage(currentPage, totalPage)} />
					<span title={`page :${totalPage}`}>
						<Right onClick={() => requiredPage(totalPage)} />
					</span>
				</div>
			</div>
		</div>
	);
};

export default TaskList;
