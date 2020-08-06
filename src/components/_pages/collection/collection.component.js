import React from 'react';
import { connect } from 'react-redux';


import CollectionItem from '../../collection-item/collection-item.component';
import { selectCollection } from '../../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({match, collection}) => {
	// console.log('collection', collection);
	// console.log('match.params.collectionId', match.params.collectionId)
	return (
		<div className='collection-page'>
			<h2 className='title'>{collection.title}</h2>
			<div className='items'>
				{
					collection.items.map(item => 
						<CollectionItem key={item.id} item={item} />
					)
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state)
});


export default connect(mapStateToProps)(CollectionPage);