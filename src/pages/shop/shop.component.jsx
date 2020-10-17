import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, converCollectionsSnapshotsToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubscribeSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    const collectionRef = firestore.collection('collections'); 

    // when the collections object array is update
    this.unsubscribeSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionMap = converCollectionsSnapshotsToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ loading: false });
    }); 
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} 
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )} 
        />
        <Route path={`${match.path}/:collectionId`} 
          render={(props) => (
            <CollectionsPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);