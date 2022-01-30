import React from 'react';
import './adminModal.scss';
import {useAction} from '../../hooks/useAction';

const AdminModal = () => {
	const {adminModal} = useAction();
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
					className='adminModal__container-input'
					placeholder='username'
					type='text'
				/>
				<input
					className='adminModal__container-input'
					placeholder='password'
					type='password'
				/>
				<button className='adminModal__container-button'>SEND</button>
			</div>
		</div>
	);
};

export default AdminModal;
