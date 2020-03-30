import '../bootstrap';
import api from './api';
import lib from './lib';

// TODO: delete をクリックした際にリストからアイテムを削除する

// TODO: 入力フォームからアイテムを追加する

// TODO: アイテムのチェック時に完了としてマークする

// TODO: アイテムのフィルタリング (all, active, completed)

// TODO: API を使ってアイテムを取得する

/**
 * 名前空間として使う
 */
const app = {};

/**
 * Todo 保存用
 */
app.todos = [];

/**
 * .templates 以下を検索してテンプレートを生成する
 *
 * @param {string} name
 * @return {HTMLElement}
 */
app.template = name => {
  return document.querySelector(`.templates > .${name}`).cloneNode(true);
};

/**
 * TodoListItem ビュー作成
 *
 * @param {Object} todoItem
 * @return {HTMLElement}
 */
app.todoListItemView = todoItem => {
  const view = app.template('todo-list-item-view');

  // テキストの初期化
  const description = view.querySelector('.todo-description');
  description.textContent = todoItem.description;

  // チェックボックスの初期化
  const checkbox = view.querySelector('.completion-checkbox');
  if (todoItem.state === 'completed') {
    checkbox.checked = true;
  }

  // 削除ボタンの初期化
  const deleteBtn = view.querySelector('.todo-delete-btn');
  deleteBtn.style.display = 'none';
  view.addEventListener('mouseover', () => {
    deleteBtn.style.display = 'block';
  });
  view.addEventListener('mouseleave', () => {
    deleteBtn.style.display = 'none';
  });

  return view;
};

/**
 * TodoList ビュー作成
 *
 * @param {Array.<HTMLElement>} todoListItemViews
 * @return HTMLElement
 */
app.todoListView = todoListItemViews => {
  const view = app.template('todo-list-view');
  todoListItemViews.forEach(item => {
    view.appendChild(item);
  });

  return view;
};

/**
 * TodoList ビューを描画
 *
 * @param {Array.<Object>} todos
 */
app.renderTodoList = todos => {
  const container = document.querySelector('.todo-list-view-container');
  const itemViews = todos.map(app.todoListItemView);

  lib.removeAllChild(container);
  container.appendChild(app.todoListView(itemViews));
};

// DOM を初期化
document.addEventListener('DOMContentLoaded', () => {
  api.fetchTodos().then(
    todos => {
      app.todos.push(...todos);
      app.renderTodoList(app.todos);
    },
    errors => console.error(errors)
  );
});
