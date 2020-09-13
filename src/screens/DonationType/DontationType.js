import './styles.css';

import {Div, Panel, PanelHeader} from '@vkontakte/vkui';

import {DonationType} from '../../store/state/donation_details/state';
import DontationItem from './Components/DonationItem';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {PanelHeaderButton} from '@vkontakte/vkui';
import React from 'react';

const DontationType = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderButton data-to="home" onClick={(e) => go(e, true)}><Icon24Back/></PanelHeaderButton>}>Тип сбора</PanelHeader>
        <Div>
        <div className={'donation-type-placeholder'}>
            <DontationItem go={go} detailsId={DonationType.goal}/>
            <DontationItem go={go} detailsId={DonationType.regular}/>
        </div>
        </Div>
    </Panel>
);

export default DontationType;
