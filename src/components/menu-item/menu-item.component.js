import React from 'react'; 

import './menu-item.styles.scss';

const MenuItem = (props) => (
	<div	className = {`${props.section.size} menu-item`} >
		<div className ='background-image' style={{
		backgroundImage: `url(${props.section.imageUrl})`,
		}}/>
		<div className='content'>
			<h1 key={props.section.id} className='title'>{props.section.title.toUpperCase()}</h1>
			<span className='subtitle'>SHOP NOW</span>
		</div>
	</div>	
);

export default MenuItem;