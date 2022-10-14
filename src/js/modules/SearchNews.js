export class SearchNews {
  static get(value) {
    const list = document.querySelectorAll('.app-card');
    let titleText;
    let filter = value.toUpperCase();
    for (let i = 0; i < list.length; i++) {
      titleText = list[i].querySelector('.app-card__subtext').innerText;
      if (titleText.toUpperCase().indexOf(filter) > -1) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }
  }
}