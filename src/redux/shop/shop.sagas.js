/**
 * SAGA helps to run multiple dispatches simultaneously without blocking the js code
 */
// import effects
import { takeEvery } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    // yields are give control to the saga middleware -- to cancel / next
    yield console.log('am a yield');
}

export function* fetchCollectionsStart() {
    // this helps to run the action asynchronously
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}