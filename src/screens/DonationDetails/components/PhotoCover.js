import {Cell, Title} from '@vkontakte/vkui';

import Icon28PictureOutline from '@vkontakte/icons/dist/28/picture_outline';
import React from 'react';

const PhotoCover = () => (
    <div className={'cover-container'}>
        <div className={'cover'}>
            <Cell before={< Icon28PictureOutline />}>
                <Title className={'upload-photo-title'}>Загрузить изображение</Title>
            </Cell>
        </div>
    </div>
);

export default PhotoCover;