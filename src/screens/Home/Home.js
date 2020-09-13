import "./styles.css";

import {Button, Panel, PanelHeader, Text} from '@vkontakte/vkui';

import React from 'react';
import {connect} from "redux-zero/react";

const mapToProps = ({counterState, go}) => ({counterState});

const Home = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader>Пожертвования</PanelHeader>
        <div className="placeholder">
            <Text>У Вас пока нет сборов. Начните доброе дело.</Text>
            <Button data-to={'donation-type'} onClick={(e) => go(e)} className="create-btn">Создать сбор</Button>
        </div>
    </Panel>
);

export default connect(mapToProps, {})(Home);
