import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
//NOTE: reference  https://github.com/azmenak/react-stripe-checkout

import './stripe-buttton.styles.scss';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price*100;
	const publicableKey = 'pk_test_51H1emdEM6laGkAFLEpN9AZ8rfIFHLMyaDvQWtsrKgxD8yuX0crfVh9p1MnLfTLxztyS9njDlPVTqeKdxLYS6i4yP00iYAZ8m4Z';

	const onToken = token => {
		console.log(token);
		alert('Payment successful')
	}

	return ( 
	<StripeCheckout
		label='PayNow'
		name ='CRWM Clothing Ltd.'
		billingAddress
		shippingAddress
		image='https://svgshare.com/i/CUz.svg'
		description={`Your total is $${price}`}
		amount={priceForStripe}
		panelLabel='Pay Now'
		token={onToken}
		stripeKey={publicableKey}
		/>
	)
}

export default StripeCheckoutButton; 



