import '@vkontakte/vkui/dist/vkui.css';

import {ConfigProvider, ModalCard, ModalRoot, View} from '@vkontakte/vkui';
import React, {useEffect} from 'react';

import DontationDetails from './screens/DonationDetails/DonationDetails';
import DontationType from './screens/DonationType/DontationType';
import Home from './screens/Home/Home';
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import bridge from '@vkontakte/vk-bridge';
import {connect} from "redux-zero/react";
import globalActions from './store/actions/global/actions';
import store from './store/store';

const mapToProps = ({globalState}) => ({activePanel: globalState.activePanel, activeModal: globalState.activeModal,history: globalState.history});

const App = ({activePanel, activeModal, history, setActivePanel, setHistory, setActiveModal}) => {
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

    const onModalClose = () => setActiveModal(null);

    const modal = (
        <ModalRoot activeModal={activeModal}>
          <ModalCard 
          icon={<Icon56CheckCircleOutline/>}
          id="finish" 
          onClose={onModalClose} 
          header={'Tech-Birds'} 
          caption={'Вы прошли весь макет, надеемся, что Вам понравилось. Пройти еще раз?'}
          actions={[{
            title: 'Пройти еще раз',
            mode: 'primary',
            action: () => {
                store.reset();
            }
          }]}
          >
              
          </ModalCard>
        </ModalRoot>
      );

    return (
        <ConfigProvider isWebView={true}>
            <View activePanel={activePanel} onSwipeBack={goBack} history={history} modal={modal}>
                <Home id='home' go={go}/>
                <DontationType id='donation-type' go={go}/>
                <DontationDetails id='donation-details' go={go}/>
            </View>
        </ConfigProvider>
    );
}

export default connect(mapToProps, globalActions)(App);
