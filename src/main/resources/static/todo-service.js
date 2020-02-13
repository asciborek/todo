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
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 201) {
        return response.json();
      } else {
        return Promise.resolve(ERROR);
      }
    }).catch(_ => {
      return Promise.resolve(ERROR);
    });
  }

  delete(id) {
    return fetch('todos/' + id, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 204) {
        return SUCCESS;
      }
    })
  }

  setDone(id, done) {
    const url = '/todos/' + id + "?done=" + done;
    return fetch(url, {
      method: 'PATCH'
    }).then(response => {
      if (response.status === 204) {
        return SUCCESS;
      }
    });
  }

}