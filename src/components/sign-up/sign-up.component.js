import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions'

import './sign-up.component.scss';
import { connect } from 'react-redux';

const SignUp = ({signUpStart}) =>  {
	const [userCredentials, setUserCredentials] = useState({
		displayName: '',
		email: '', 
		password: '', 
		confirmPassword: ''
	});
	const {displayName, email, password, confirmPassword} = userCredentials;

	const handleChange = event => {
		const {name, value} = event.target;
		setUserCredentials({...userCredentials, [name]: value });
	}

	const handleSubmit = async event => {
		event.preventDefault();
		if (password !== confirmPassword){
			alert('Passwords do not match');
			return;
		}
		signUpStart(email, password, displayName);
	}

	return (
		<div className='sign-up'>
			<h2>I do not have an account</h2>
			<span>Sign up with email and password</span>
			<form onSubmit={handleSubmit} >
				<FormInput name='displayName' type='text' value={userCredentials.displayName} required handleChange={handleChange} label='Display Name'/>
				<FormInput name='email' type='email' value={userCredentials.email} required handleChange={handleChange} label='Email'/>
				<FormInput name='password' type='password' value={userCredentials.password} required handleChange={handleChange} label='Password'/>
				<FormInput name='confirmPassword' type='password' value={userCredentials.confirmPassword} required handleChange={handleChange} label='Confirm Password'/>
				<CustomButton type='submit'>Sign Up</CustomButton>
			</form>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	signUpStart: (email, password, displayName) => dispatch(signUpStart({email, password, displayName}))
})


export default connect(null, mapDispatchToProps)(SignUp);
