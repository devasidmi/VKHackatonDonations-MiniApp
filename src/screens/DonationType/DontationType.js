import {Panel, PanelHeader} from '@vkontakte/vkui';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import {PanelHeaderButton} from '@vkontakte/vkui';
import React from 'react';

const DontationType = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader left={<PanelHeaderButton data-to="home" onClick={(e) => go(e, true)}><Icon24Back/></PanelHeaderButton>}>Тип сбора</PanelHeader>
    </Panel>
);

export default DontationType;
