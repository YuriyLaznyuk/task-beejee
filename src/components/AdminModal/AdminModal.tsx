import React from 'react';
import './adminModal.scss';
import {useAction} from '../../hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';

const AdminModal = () => {
	const {adminModal, inputAdmin, adminLogin} = useAction();
	const {password, username} = useSelector((state: RootState) => state.admin);
	return (
		<div onClick={() => adminModal(false)} className='adminModal'>
			<div
				onClick={(e) => e.stopPropagation()}
				className='adminModal__container'>
				<div
					onClick={() => adminModal(false)}
					className='adminModal__container-close'>
					CLOSE
				</div>
				<input
					onChange={(e) => inputAdmin({username: e.target.value, password})}
					className='adminModal__container-input'
					placeholder='username'
					value={username}
					type='text'
				/>
				<input
					onChange={(e) => inputAdmin({username, password: e.target.value})}
					className='adminModal__container-input'
					placeholder='password'
					value={password}
					type='password'
				/>
				<button
					onClick={() => adminLogin(username, password)}
					className='adminModal__container-button'>
					SEND
				</button>
			</div>
		</div>
	);
};

export default AdminModal;
