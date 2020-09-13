import {Cell, Title} from '@vkontakte/vkui';

import Icon24DismissOverlay from '@vkontakte/icons/dist/24/dismiss_overlay';
import Icon28PictureOutline from '@vkontakte/icons/dist/28/picture_outline';
import React from 'react';
import UploadedImage from '../../../assets/uploaded-image.png';

const PhotoCover = ({uploaded, onTap, onCrossTap}) => (
    <div className={'cover-container'}>
        {!uploaded && <div className={'cover'}>
            <Cell before={< Icon28PictureOutline />}>
                <Title onClick={onTap} className={'upload-photo-title'}>Загрузить изображение</Title>
            </Cell>
        </div>}
        {uploaded && <div
            className={'uploaded-image'}
            style={{
            backgroundImage: `url(${UploadedImage})`
        }}>
            <Icon24DismissOverlay
                onClick={onCrossTap}
                style={{
                padding: '8px'
            }}/>
        </div>}
    </div>
);

export default PhotoCover;