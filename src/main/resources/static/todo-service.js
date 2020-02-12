export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export class TodoService {

  readAll() {
    return fetch('/todos').then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.resolve([]);
      }
    }).catch(_ => Promise.resolve([]));
  }

  create(data) {
    return fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(response => {
      if (response.status === 201) {
        const locate = response.headers.get('Location');
        return this.getNewToDo(locate);
      } else {
        return Promise.resolve(ERROR);
      }
    }).catch(_ => {
      return Promise.resolve(ERROR);
    });
  }

  getNewToDo(locate) {
    return fetch(locate)
      .then(response => response.json())
      .catch(_ => ERROR);
  }
}