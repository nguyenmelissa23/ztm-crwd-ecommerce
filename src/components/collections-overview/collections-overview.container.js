import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../collections-overview/collections-overview.component.js';
import WithSpinner from '../with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
	isFetchingCollections: selectIsCollectionFetching, 
})

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
