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
        imageUploaded: false,
        detailsId: DonationType.goal,
        sum: 0,
        goal: '',
        description: '',
        payment: 'Счёт VK Pay · 1234',
        selectedAuthor: 0,
        authors: ["Василий Дмитриев", "Артем Белков", "Муса Фамилия", "Игорь Силаев"],
        deadlines: ["20 сентября"],
        endOptions: ["Когда соберём сумму", "В определенную дату"],
        selectedEndOption: null,
    }
}
Object.freeze(DonationDetailsState);
export default DonationDetailsState;