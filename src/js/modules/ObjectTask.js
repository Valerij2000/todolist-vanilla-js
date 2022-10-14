export class ObjectTask {
  static settings(body, status = 'green') {
    const obj = {
      body: body,
      status: status
    }
    return obj;
  }
}