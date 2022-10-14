export class News {
  static async get() {
    // https://newsapi.org/ - постоянно обновлять api
    const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-09-14&sortBy=publishedAt&apiKey=db7c154fede34fdd99a610d651d13ac2', {
      method: 'GET',
      mode: 'cors',
    });
    const json = await response.json();
    const data = await json;
    if (data === null) {
      return false;
    }
    return data;
  }
}