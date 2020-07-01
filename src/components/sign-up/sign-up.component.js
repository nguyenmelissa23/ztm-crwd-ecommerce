import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.component.scss';

class SignUp extends React.Component {
	constructor(props) {
		super (props);

		this.state = { 
			displayName: '',
			email: '', 
			password: '',
			confirmPassword: '' 
		}
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({ [name]:value });
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword){
			alert('Passwords do not match');
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			// console.log('displayName:', displayName)
			await createUserProfileDocument(user, { displayName })
			this.setState({
				displayName: '',
				email: '', 
				password: '',
				confirmPassword: '' 
			});
		} catch (error)  {
			console.log(error);	
			alert(error.message);
		}
	}


	render() {
		// const { displayName, email, password, confirmPassword } = this.state;
	return (
		<div className='sign-up'>
			<h2>I do not have an account</h2>
			<span>Sign up with email and password</span>
			<form onSubmit={this.handleSubmit} >
				<FormInput name='displayName' type='text' value={this.state.displayName} required handleChange={this.handleChange} label='Display Name'/>
				<FormInput name='email' type='email' value={this.state.email} required handleChange={this.handleChange} label='Email'/>
				<FormInput name='password' type='password' value={this.state.password} required handleChange={this.handleChange} label='Password'/>
				<FormInput name='confirmPassword' type='password' value={this.state.confirmPassword} required handleChange={this.handleChange} label='Confirm Password'/>
				<CustomButton type='submit'>Sign Up</CustomButton>
			</form>
		</div>
	)
	}
}

export default SignUp;
