export class Model {
  static async get() {
    const response = await fetch('https://todolist-eed1c-default-rtdb.firebaseio.com/todolist.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    const data = await json;
    if (data === null) {
      return false;
    }
    return data;
  }

  static set(data) {
    return fetch('https://todolist-eed1c-default-rtdb.firebaseio.com/todolist.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  static delete(hashname) {
    return fetch(`https://todolist-eed1c-default-rtdb.firebaseio.com/todolist/${hashname}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Delete success');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}