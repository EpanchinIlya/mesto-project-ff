const getUserInformation = (config) => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    (res) => {
      return getResponseData(res);
    }
  );
};

const getAllCards = (config) => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    (res) => {
      return getResponseData(res);
    }
  );
};

const getAllData = (config) => {
  return [getUserInformation(config), getAllCards(config)];
};

const setUserInformation = (config, name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
};

const setNewCard = (config, name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
};

// удаление карточки

const deleteCardFromServer = (config, id) => {
  return fetch(`${config.baseUrl}/cards/` + id, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

// установка аватара

const setUserAvatar = (config, link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
};

// установка/ снятие лайка

const addRemoveLikeCard = (config, id, like) => {
  let _method = undefined;
  if (like === true) {
    _method = "PUT";
  } else {
    _method = "DELETE";
  }

  return fetch(`${config.baseUrl}/cards/likes/` + id, {
    method: _method,
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

// преобразование в json

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {
  getUserInformation,
  getAllCards,
  getAllData,
  setUserInformation,
  setNewCard,
  deleteCardFromServer,
  addRemoveLikeCard,
  setUserAvatar,
};
