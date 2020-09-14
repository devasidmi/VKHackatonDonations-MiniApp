const actions = store => ({
    setDetailsId: (state, detailsId) => ({
        ...state,
        donationDetailsState: {
            ...state.donationDetailsState,
            detailsId
        }
    }),
    setImageUploaded: (state, imageUploaded) => ({
        ...state,
        donationDetailsState: {
            ...state.donationDetailsState,
            imageUploaded
        }
    }),
    setDetails: (state, payload) => ({
        ...state,
        donationDetailsState: payload
    }),

});

export default actions;