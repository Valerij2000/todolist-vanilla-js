export class Validate {
  static checkField(field) {
    if (field.value !== '' && field.value.length > 2 && field.value.length < 20) {
      field.classList.remove('_error');
      return true;
    } else {  
      field.classList.add('_error');
      return false;
    }
  }

  static clean(field) {
    field.value = '';
  }
}