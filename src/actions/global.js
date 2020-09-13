const actions = store => ({
    setActivePanel: (state, activePanel) => ({
        ...state,
        globalState: {
            ...state.globalState,
            activePanel
        }
    }),
    setHistory: (state, history) => ({
        ...state,
        globalState: {
            ...state.globalState,
            history
        }
    }),
    setActiveModal: (state, activeModal) => ({
        ...state,
        globalState: {
            ...state.globalState,
            activeModal
        }
    })
});

export default actions;