import DonationDetailsState from "./state/donation_details/state";
import GlobalState from "./state/global/state";
import {applyMiddleware} from "redux-zero/middleware";
import createStore from "redux-zero";

const logger = store => (next, args) => action => {
    console.log("current state", store.getState());
    console.log("action", action.name, ...args);
    return next(action);
};

const initialState = {
    globalState: GlobalState.initialState,
    donationDetailsState: DonationDetailsState.initialState,
};
const middlewares = applyMiddleware(logger);

const store = createStore(initialState, middlewares);

export default store;