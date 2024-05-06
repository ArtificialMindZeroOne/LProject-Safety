type TOptions = {
  headers: {
    authorization: string;
  };
  method?: string;
  body?: string;
};

function request(url: string, options: TOptions) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: 'Здесь убрал свой ключ авторизации',
    'Content-Type': 'application/json',
  },
};

export async function getCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

export async function addLike(ID: string) {
  return request(`${config.baseUrl}/cards/${ID}/likes`, {
    method: 'PUT',
    headers: config.headers,
  });
}

export async function deleteLike(ID: string) {
  return request(`${config.baseUrl}/cards/${ID}/likes`, {
    method: 'DELETE',
    headers: config.headers,
  });
}

export function addNewCard(body: any) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(body),
  });
}

export function deleteCard(ID: string) {
  return request(`${config.baseUrl}/cards/${ID}`, { method: 'DELETE', headers: config.headers });
}

export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, { headers: config.headers });
}

export function setUserData(body: any) {
  return request(`${config.baseUrl}/users/me`, { method: 'PATCH', headers: config.headers, body: JSON.stringify(body) });
}

export function editAvatar(body: any) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(body),
  });
}
