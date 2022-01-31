import React, {useEffect} from 'react';
import {useAction} from './hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducers';
import TaskList from './components/TaskList/TaskList';
import './app.scss';

const App = () => {
	const {fetchTasks, adminAuth} = useAction();
	const {currentPage, sortDirection, sortField} = useSelector(
		(state: RootState) => state.tasks,
	);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			adminAuth();
		}
		fetchTasks(currentPage, sortField, sortDirection);
	}, [currentPage]);
	return (
		<div className='app'>
			<h1>Hello world</h1>
			<TaskList />
		</div>
	);
};

export default App;
