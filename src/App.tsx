import React, {useEffect} from 'react';
import {useAction} from './hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducers';
import TaskList from './components/TaskList/TaskList';
import './app.scss';

const App = () => {
	const {fetchTasks, adminAuth} = useAction();
	const {currentPage, sortDirection, sortField, taskEffect} = useSelector(
		(state: RootState) => state.tasks,
	);
	const field = sessionStorage.getItem('field');
	const direction = sessionStorage.getItem('direction');
	const page = sessionStorage.getItem('page');
	const ascEmail = JSON.parse(sessionStorage.getItem('ascemail') as string);
	const ascName = JSON.parse(sessionStorage.getItem('ascname') as string);
	const ascStatus = JSON.parse(sessionStorage.getItem('ascstatus') as string);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			adminAuth();
		}
		if (page) {
			fetchTasks(
				Number(page),
				String(field),
				String(direction),
				ascEmail,
				ascName,
				ascStatus,
			);
		}
		if (page === null) {
			fetchTasks(currentPage, sortField, sortDirection, true, true, true);
		}
	}, [currentPage, taskEffect]);
	return (
		<div className='app'>
			<h1>Hello world</h1>
			<TaskList />
		</div>
	);
};

export default App;
