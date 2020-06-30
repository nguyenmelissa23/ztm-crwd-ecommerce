import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.component.scss';

class SignUp extends React.Component {
	constructor(props) {
		super (props);

		this.state = { 
			email: '', 
			password: '',
			name: '' 
		}
	}

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({[name]:value});
	}

	handleSubmit = event => {
		event.preventDefault();

		this.setState({email:'', password: ''});
	}


	render() {
	return (
		<div className='sign-up'>
			<h2>I don't have an account</h2>
			<span>Sign up with email and password</span>
			<form onSubmit={this.handleSubmit} >
				<FormInput name='email' type='email' value={this.state.email} required handleChange={this.handleChange} label='Email'/>
				<FormInput name='password' type='password' value={this.state.password} required handleChange={this.handleChange} label='Password'/>
				<FormInput name='name' type='text' value={this.state.name} required handleChange={this.handleChange} label='Name'/>
				<CustomButton type='submit'>Sign Up</CustomButton>
			</form>
		</div>
	)
	}
}

export default SignUp;
