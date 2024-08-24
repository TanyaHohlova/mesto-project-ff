const PATH = 'https://mesto.nomoreparties.co/v1/wff-cohort-20';
const handelRespons = (respons) => {
    if (respons.ok) {
        return respons.json()
    }
    return Promise.reject(`Ошибка: ${respons.status}`);
};

export const getEditProfile = () => {
    return fetch(`${PATH}/users/me`, {
        method: 'GET',
        headers: {
            authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5'
        },
    })
    .then(handelRespons)
};

export const getNewCard = () => {
    return fetch(`${PATH}/cards`, {
        method: 'GET',
        headers: {
            authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5'
        }
        })
    .then(handelRespons)
};

export const aditEditProfile = (inputName, inputAbout) => {
    return fetch(`${PATH}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName,
                about: inputAbout
            })
    })
    .then(handelRespons)
};

export const editNewCard = (obj) => {
    return fetch(`${PATH}/cards`, {
            method: 'POST',
            headers: {
                authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: obj.name,
              link: obj.link
            })
    })
    .then(handelRespons)
};


export  const serverDeleteCard = (cardId) => {
    return fetch (`${PATH}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5',
        }
    })
    .then(handelRespons)
}

export  const addLakesCard = (cardId) => {
    return fetch (`${PATH}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5',
        }
    })
    .then(handelRespons)
}

export  const removeLakesCard = (cardId) => {
    return fetch (`${PATH}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5',
        }
    })
    .then(handelRespons)
}

export const aditAvatarUser = (link) => {
    return fetch(`${PATH}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization:'c1ef3bdd-d4f9-4789-91ac-ef607722f3b5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
    })
    .then(handelRespons)
};