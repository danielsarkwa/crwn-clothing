import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// this is an action that is performed by the app -- and as it performs it's tasks, perform(dispatch other actions) that also so other things
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    // const collectionRef = firestore.collection('collections');
    // dispatch(fetchCollectionsStart());

    // collectionRef
    //   .get()
    //   .then(snapshot => {
    //     const collectionsMap = converCollectionsSnapshotsToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    //   })
    //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};