import {
  Model
} from "./Model";
let Posts = null;
let LostPosts = null;
let ViewCard = null;
export class View {
  static async renderTaskList(data) {
    const res = await data;
    const keys = Object.keys(res);
    const container = document.querySelector('.todo-podcast');
    let html;
    for (let i = 0; i < keys.length; i++) {
      let obj = res[keys[i]];
      html = `
        <li class="adobe-product">
          <div class="products">
            <svg viewBox="0 0 52 52" style="border:1px solid #3291b8">
              <g xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                  fill="#061e26" data-original="#393687" />
                <path
                  d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z"
                  fill="#c1dbe6" data-original="#89d3ff" />
              </g>
            </svg>
            ${obj.body}
          </div>
          <span class="status ${obj.status}">Level ${obj.status}</span>
          <div class="button-wrapper">
            <button class="content-button bg-red btn-delete" hashname="${keys[i]}">Remove</button>
          </div>
        </li>
      `;
      container.insertAdjacentHTML('beforeend', html);
    }
  }
  static update() {
    document.querySelector('.todo-podcast').innerHTML = '';
  }
  static removeCard() {
    document.querySelectorAll('.btn-delete').forEach(el => {
      el.addEventListener('click', function () {
        Model.delete(this.getAttribute('hashname'));
        this.parentElement.parentElement.remove();
      })
      el.addEventListener('mouseover', function () {
        this.innerHTML = 'Done'
      })
      el.addEventListener('mouseout', function () {
        this.innerHTML = 'Remove'
      })
    })
  }
  static async renderNews(data) {
    const res = await data;
    Posts = res;
    let articles = res.articles;
    ViewCard = articles.length / 2;
    View.htmlRenderNews(0, ViewCard, articles);
  }
  static lostPosts() {
    if (LostPosts !== 0) {
      let endCard = ViewCard + 10;
      View.htmlRenderNews(ViewCard, endCard, Posts.articles);
      ViewCard = endCard;
    } else {
      document.querySelector('[load-more]').classList.add('disabled');
      document.querySelector('[load-more]').innerHTML = 'Oooops! Finihed posts :(';
    }
  }
  static htmlRenderNews(start, view, articles) {
    const container = document.querySelector('.apps-card');
    let html, authorText;
    for (let i = start; i < view; i++) {
      authorText = validateAutorLength(articles[i].author);
      html = `
        <div class="app-card">
          <span>
            <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
              <path xmlns="http://www.w3.org/2000/svg"
                d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
                fill="#210027" data-original="#7b1fa2" />
              <g xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
                  fill="#f6e7fa" data-original="#e1bee7" />
              </g>
            </svg>
            ${articles[i].title}
          </span>
          <div class="app-card__subtext">${articles[i].description}</div>
          <div class="app-card-buttons">
            <button class="content-button">${authorText}</button>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
      LostPosts = articles.length - view;
    }
  }
}

function validateAutorLength(text) {
  if (text === null) {
    return 'Not Author';
  } else if (text.length >= 20) {
    return text.slice(0, 20);
  } else {
    return text;
  }
}