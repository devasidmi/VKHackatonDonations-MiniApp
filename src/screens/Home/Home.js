import React from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>TechBirds</PanelHeader>
	</Panel>
);

export default Home;
