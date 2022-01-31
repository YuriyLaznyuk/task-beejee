import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import {useAction} from '../../hooks/useAction';
import {validEmail} from './createTaskLogic';
import './createTask.scss';

const CreateTask = () => {
	const {username, email, text} = useSelector(
		(state: RootState) => state.tasks,
	);

	const {addField, postCreateTask} = useAction();
	return (
		<div className='createTask'>
			<h1>Create Task</h1>
			<div className='createTask__container'>
				<input
					className='createTask__container-input'
					onChange={(e) => addField({email, username: e.target.value, text})}
					value={username}
					type='text'
					placeholder='username'
				/>
				{email.length > 0 && !validEmail(email) && (
					<span className='createTask__container-valid'>invalid email</span>
				)}
				<input
					className='createTask__container-input'
					onChange={(e) => addField({username, email: e.target.value, text})}
					value={email}
					type='text'
					placeholder='email'
				/>
				<input
					className='createTask__container-input'
					onChange={(e) => addField({email, username, text: e.target.value})}
					value={text}
					type='text'
					placeholder='text'
				/>

				<div className='createTask__container-button'>
					<button
						className='createTask__container-button-btn'
						onClick={() => postCreateTask(username, email, text)}>
						SEND
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateTask;
