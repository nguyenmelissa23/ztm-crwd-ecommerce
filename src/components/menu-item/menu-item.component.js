import React from 'react'; 
import {withRouter} from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = (props) => {
	let thisSection = props.section;
	let thisHistory = props.history;
	let thisMatch = props.match;
	return (
		<div	className = {`${thisSection.size} menu-item`} onClick={() => thisHistory.push(`${thisMatch.url}${thisSection.linkUrl}`)} >
			<div className ='background-image' style={{
			backgroundImage: `url(${thisSection.imageUrl})`,
			}}/>
			<div className='content'>
				<h1 className='title'>{thisSection.title.toUpperCase()}</h1>
				<span className='subtitle'>SHOP NOW</span>
			</div>
		</div>	
	)

};

export default withRouter(MenuItem);