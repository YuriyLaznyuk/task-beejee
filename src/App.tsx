import React, {useEffect} from 'react';
import './app.scss';
import {useAction} from './hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducers';
import TaskList from './components/TaskList/TaskList';

const App = () => {
	const {fetchTasks} = useAction();
	const {currentPage} = useSelector((state: RootState) => state.tasks);
	useEffect(() => {
		fetchTasks(currentPage);
	}, []);
	return (
		<div className='app'>
			<h1>Hello world</h1>
			<TaskList />
		</div>
	);
};

export default App;