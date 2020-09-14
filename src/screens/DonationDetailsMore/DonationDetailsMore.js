import {
    Button,
    FixedLayout,
    FormLayout,
    FormLayoutGroup,
    Panel,
    PanelHeader,
    PanelHeaderButton,
    Radio,
    Select
} from '@vkontakte/vkui';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import React from 'react';
import { combineActions } from 'redux-zero/utils';
import {connect} from 'redux-zero/react';
import donationDetailsActions from '../../store/actions/donation_details/actions';
import globalAction from '../../store/actions/global/actions';
import store from '../../store/store';

const mapToProps = ({donationDetailsState}) => ({authors: donationDetailsState.authors, selectedAuthor: donationDetailsState.selectedAuthor, deadlines: donationDetailsState.deadlines, endOptions: donationDetailsState.endOptions, selectedEndOption: donationDetailsState.selectedEndOption});

const DonationDetailsMore = ({
    id,
    go,
    selectedAuthor,
    authors,
    deadlines,
    endOptions,
    selectedEndOption,
    setDetails,
    setActiveModal,
}) => {

    const onFormUpdate = (e, field) => {
        const {value} = e.target
        const clonnedDetails = {
            ...store
                .getState()
                .donationDetailsState
        };
        clonnedDetails[field] = value;
        setDetails(clonnedDetails);
    }

    return (

        <Panel id={id}>
            <PanelHeader
                left={< PanelHeaderButton data-to = {
                "donation-details"
            }
            onClick = {
                (e) => go(e, true)
            } > <Icon24Back/> </PanelHeaderButton>}>{'Дополнительно'}</PanelHeader>
            <FormLayout>
                <Select
                    onChange={(e) => onFormUpdate(e, 'selectedAuthor')}
                    top="Автор"
                    value={selectedAuthor}
                    name="author">
                    {authors.map((a, idx) => <option key={idx} value={idx}>{a}</option>)}
                </Select>
                <FormLayoutGroup top="Сбор завершится">
                    {endOptions.map((eo, idx) => <Radio
                        name="radio"
                        onChange={(e) => onFormUpdate(e, 'selectedEndOption')}
                        key={idx}
                        value={idx}>{eo}</Radio>)}
                </FormLayoutGroup>
                <Select
                    disabled={selectedEndOption === null || selectedEndOption === 0}
                    top="Дата окончания"
                    name="deadline">
                    {deadlines.map((d, idx) => <option key={idx} value={idx}>{d}</option>)}
                </Select>
            </FormLayout>
            <FixedLayout filled={true} style={{padding: '12px', paddingBottom: 'var(--safe-area-inset-top);'}} vertical={'bottom'}>
                <Button
                    disabled={selectedEndOption === null}
                    onClick={() => setActiveModal('finish')}
                    size="xl">{'Создать сбор'}</Button>
            </FixedLayout>
        </Panel>
    )
}

export default connect(mapToProps, combineActions(donationDetailsActions, globalAction))(DonationDetailsMore);