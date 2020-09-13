import {Cell} from '@vkontakte/vkui';
import {DonationType} from '../../../store/state/donation_details/state';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import React from 'react';
import actions from '../../../store/actions/donation_details/actions';
import {connect} from 'redux-zero/react';

const DontationItem = ({go, detailsId, setDetailsId}) => (
    <Cell
        className={'donation-item'}
        expandable
        data-to={'donation-details'}
        size="l"
        description={detailsId.description}
        onClick={(e) => {
        setDetailsId(detailsId);
        go(e);
    }}
        before={detailsId === DonationType.goal
        ? <Icon28TargetOutline/>
        : <Icon28CalendarOutline/>}>{detailsId.title}</Cell>
);

export default connect(null, actions)(DontationItem);
