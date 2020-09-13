import '@vkontakte/vkui/dist/vkui.css';

import {ConfigProvider, View} from '@vkontakte/vkui';
import React, {useEffect} from 'react';

import DontationType from './screens/DonationType/DontationType';
import Home from './screens/Home/Home';
import actions from './state/global/actions';
import bridge from '@vkontakte/vk-bridge';
import {connect} from "redux-zero/react";

const mapToProps = ({globalState}) => ({activePanel: globalState.activePanel, history: globalState.history});

const App = ({activePanel, history, setActivePanel, setHistory}) => {
    useEffect(() => {
        bridge.subscribe(({
            detail: {
                type,
                data
            }
        }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme
                    ? data.scheme
                    : 'client_light';
                document
                    .body
                    .attributes
                    .setNamedItem(schemeAttribute);
            }
        });
    }, []);

    const go = (e, dismiss = false) => {
		const to = e.currentTarget.dataset.to
		const clonnedHistory = [...history];
        if (dismiss) {
            clonnedHistory.pop();
        } else {
            clonnedHistory.push(to);
        }

		if (to !== 'home') {
			bridge.send('VKWebAppEnableSwipeBack');
        } else {
            bridge.send('VKWebAppDisableSwipeBack');
        }
        
        setActivePanel(to);
        setHistory(clonnedHistory);
	}

    const goBack = () => {
        const clonnedHistory = [...history];
        clonnedHistory.pop();
        const activePanel = clonnedHistory[clonnedHistory.length - 1];
        if (activePanel === 'home') {
            bridge.send('VKWebAppDisableSwipeBack');
        }
        setActivePanel(activePanel);
        setHistory(clonnedHistory);
    }

    console.log('build!');
    return (
        <ConfigProvider isWebView={true}>
            <View activePanel={activePanel} onSwipeBack={goBack} history={history}>
                <Home id='home' go={go}/>
                <DontationType id='donation-type' go={go}/>
            </View>
        </ConfigProvider>
    );
}

export default connect(mapToProps, actions)(App);
