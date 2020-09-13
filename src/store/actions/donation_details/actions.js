const actions = store => ({
    setDetailsId: (state, detailsId) => ({
        ...state,
        donationDetailsState: {
            ...state.donationDetailsState,
            detailsId
        }
    }),
    setDetails: (state, payload) => ({
        ...state,
        donationDetailsState: payload
    }),

});

export default actions;