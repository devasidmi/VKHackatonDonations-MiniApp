import './styles.css';

import {
    Button,
    FormLayout,
    Input,
    Panel,
    PanelHeader,
    Select,
    Textarea
} from '@vkontakte/vkui';
import React, {useState} from 'react';

import {DonationType} from '../../store/state/donation_details/state';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {PanelHeaderButton} from '@vkontakte/vkui';
import PhotoCover from './Components/PhotoCover';
import bridge from '@vkontakte/vk-bridge';
import {combineActions} from "redux-zero/utils";
import {connect} from "redux-zero/react";
import currencyFormatter from 'currency-formatter';
import donationDetailsActions from '../../store/actions/donation_details/actions';
import globalActions from '../../store/actions/global/actions';
import store from '../../store/store';

const mapToProps = ({donationDetailsState}) => ({donationDetailsState});

const DontationDetails = ({id, go, donationDetailsState, setDetails, setActiveModal}) => {

    const {
        detailsId,
        authors,
        sum,
        goal,
        description,
        selectedAuthor
    } = donationDetailsState;

    const [showErrors,
        setShowErrors] = useState(false);
    const [uploaded,
        setUploaded] = useState(false);

    const onFormUpdate = (e, field) => {
        const {value} = e.target
        const clonnedDetails = {
            ...donationDetailsState
        };
        clonnedDetails[field] = field !== 'sum'
            ? value
            : parseInt(value.replace(' ', ''));
        setDetails(clonnedDetails);
    }

    const formatSum = value => currencyFormatter.format(value, {
        symbol: '₽',
        decimal: '',
        thousand: ' ',
        precision: 0,
        format: '%v'
    });

    const sumIsValid = () => sum > 0;
    const goalIsValid = () => goal.length > 0
    const descriptionIsValid = () => description.length > 0
    const formIsValid = () => sumIsValid() && goalIsValid() && descriptionIsValid();


    return (
        <Panel id={id}>
            <PanelHeader
                separator={false}
                left={< PanelHeaderButton data-to = {
                "donation-type"
            }
            onClick = {
                (e) => {
                    store.reset();
                    go(e, true);
                }
            } > <Icon24Back/></PanelHeaderButton>}>{detailsId.title}</PanelHeader>
            <div>
                <PhotoCover
                    onTap={() => setUploaded(true)}
                    uploaded={uploaded}
                    onCrossTap={() => setUploaded(false)}/>
                <FormLayout>
                    <Input
                        top="Сумма, ₽"
                        placeholder={'Сколько нужно собрать?'}
                        value={formatSum(sum)}
                        onChange={(e) => onFormUpdate(e, 'sum')}
                        status={showErrors
                        ? sumIsValid()
                            ? 'valid'
                            : 'error'
                        : null}
                        bottom={showErrors
                        ? sumIsValid()
                            ? ''
                            : 'Укажите сумму сбора больше 0'
                        : null}/>

                    <Input
                        top="Цель"
                        placeholder={'Например, лечение человека'}
                        value={goal}
                        onChange={(e) => onFormUpdate(e, 'goal')}
                        status={showErrors
                        ? goalIsValid()
                            ? 'valid'
                            : "error"
                        : null}
                        bottom={showErrors
                        ? goalIsValid()
                            ? ''
                            : 'Укажите цель Вашего сбора'
                        : null}/>
                    <Textarea
                        top="Описание"
                        placeholder={'На что пойдут деньги и как они кому-то помогут?'}
                        value={description}
                        onChange={(e) => onFormUpdate(e, 'description')}
                        status={showErrors
                        ? descriptionIsValid()
                            ? 'valid'
                            : 'error'
                        : null}
                        bottom={showErrors
                        ? descriptionIsValid()
                            ? ''
                            : 'Напишите описание сбора'
                        : null}/>

                    <Select top="Куда получать деньги" value={0} name="payment">
                        <option value={0}>Счёт VK Pay · 1234</option>
                    </Select>
                    {detailsId === DonationType.regular && <Select
                        onChange={(e) => onFormUpdate(e, 'selectedAuthor')}
                        top="Автор"
                        value={selectedAuthor}
                        name="author">
                        {authors.map((a, idx) => <option key={idx} value={idx}>{a}</option>)}
                    </Select>
}
                    <Button
                        onClick={() => {
                        setShowErrors(true);
                        if (!formIsValid()) {
                            bridge.send('VKWebAppTapticNotificationOccurred', {type: 'error'});
                            return;
                        }
                        setActiveModal('finish');
                    }}
                        size="xl">{detailsId === DonationType.goal
                            ? 'Далее'
                            : 'Создать сбор'}</Button>
                </FormLayout>
            </div>
        </Panel>
    );
}

export default connect(mapToProps, combineActions(donationDetailsActions, globalActions))(DontationDetails);
