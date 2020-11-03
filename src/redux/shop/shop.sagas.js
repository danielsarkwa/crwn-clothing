/**
 * SAGA helps to run multiple dispatches simultaneously without blocking the js code
 * It also listens to specific actions
 */

// import effects
import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, converCollectionsSnapshotsToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollections() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(converCollectionsSnapshotsToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    };
}

export function* fetchCollectionsStart() {
    // this helps to run the action asynchronously
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, // this listens to the actions from anywher in the application
        fetchCollections
    );
}