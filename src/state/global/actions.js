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
    })
});

export default actions;