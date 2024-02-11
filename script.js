const services = () => {
    return fetch('./fixtures/servicesMocks.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ответ сети был не в порядке')
            }
            return response.json()
        })
        .then(data => {
            return data.services
        })
        .catch(error => {
            console.error('Error ', error)
            throw error;
        })
}
const createItem = (list, data) => {
    const item = document.createElement('li');
    item.textContent = `${data.name} (${data.price})`;
    list.appendChild(item);

    if (data.node === 1) {
        item.textContent = data.name;
        const nestedList = document.createElement('ul');
        nestedList.dataset.id = data.id;
        item.appendChild(nestedList);
    }
}
services()
    .then(servicesList => {
        servicesList.sort((a, b) => {
            if (a.head === b.head) {
                return a.sorthead - b.sorthead;
            } else {
                return a.head - b.head;
            }
        });
        console.log(servicesList)
        const list = document.getElementById('list');
        const topLevelServices = servicesList.filter(data => data.head === null);

        topLevelServices.forEach(data => {
            createItem(list, data)
        });

        servicesList.forEach(data => {
            if (data.head !== null) {
                const ulElement = document.querySelector(`ul[data-id="${data.head}"]`);
                if (ulElement) {
                    createItem(ulElement, data)
                } else {
                    console.log('Элемент с data-id не найден', data.name);
                }
            }
        });

        document.body.appendChild(list);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });