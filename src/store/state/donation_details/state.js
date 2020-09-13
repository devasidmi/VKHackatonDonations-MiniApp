export const DonationType = {
    goal: {
        type: 'goal',
        title: 'Целевой сбор',
        description: 'Когда есть определённая цель'
    },
    regular: {
        type: 'regular',
        title: 'Регулярный сбор',
        description: 'Если помощь нужна ежемесячно'
    }
}

const DonationDetailsState = {
    initialState: {
        detailsId: DonationType.goal,
        name: '',
        sum: 0,
        goal: '',
        description: '',
        payment: 'Счёт VK Pay · 1234',
        selectedAuthor: 0,
        authors: ["Василий Дмитриев", "Артем Белков", "Муса Фамилия", "Игорь Силаев"]
    }
}
Object.freeze(DonationDetailsState);
export default DonationDetailsState;