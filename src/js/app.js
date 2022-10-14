import '../styles/index.css';
import {
  Sample
} from './sample';
Sample();
import {
  Model
} from './modules/Model';
import {
  ObjectTask
} from './modules/ObjectTask';
import {
  Validate
} from './modules/Validate';
import {
  View
} from './modules/View';
import { News } from './modules/News';
import { SearchNews } from './modules/SearchNews';

(function init() {
  initialRender();
  initialRenderNews();
  const stage = {
    buttonTaskHandle: document.querySelector('[button-add-task]'),
    inputTask: document.querySelector('[task-input]'),
    itemsMenu: document.querySelectorAll('.status-menu a'),
    statusMenu: document.querySelector('.status-menu'),
    buttonMore: document.querySelector('[load-more]'),
    inputSearch: document.querySelector('[data-search]')
  }
  // Render Tasks
  async function initialRender() {
    await View.renderTaskList(Model.get());
    View.removeCard();
  } 
  // Render News
  async function initialRenderNews() {
    await View.renderNews(News.get());
  }
  // Button Load More
  stage.buttonMore.addEventListener('click', () => {
    View.lostPosts();
  })
  // Button add task in Todolist
  stage.buttonTaskHandle.addEventListener('click', () => {
    initialEvents();
  })
  stage.inputTask.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
      initialEvents();
    }
  })
  // Input Search
  stage.inputSearch.addEventListener('input', function() {
    SearchNews.get(this.value);
  })
  // Validate reactive
  stage.inputTask.addEventListener('input', () => {
    Validate.checkField(stage.inputTask)
  })
  // Status menu Handler
  stage.itemsMenu.forEach(el => {
    el.addEventListener('click', function () {
      stage.statusMenu.querySelector('.active-status').classList.remove('active-status');
      this.classList.add('active-status');
    })
  })
  async function initialEvents() {
    if (Validate.checkField(stage.inputTask)) {
      const status = stage.statusMenu.querySelector('.active-status').getAttribute('status-value');
      const objectData = ObjectTask.settings(stage.inputTask.value, status);
      Validate.clean(stage.inputTask);
      View.update();
      await Model.set(objectData);
      await View.renderTaskList(Model.get());
      View.removeCard();
    }
  }
}())