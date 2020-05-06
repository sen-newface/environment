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
 * リストアイテムのビューを作成
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
  checkbox.checked = todoItem.is_completed;

  // 削除ボタンの初期化
  const deleteBtn = view.querySelector('.todo-delete-btn');
  deleteBtn.style.display = 'none';

  // マウスオーバーで削除ボタンの表示を切り替える
  view.addEventListener('mouseover', () => {
    deleteBtn.style.display = 'block'; // 表示
  });
  view.addEventListener('mouseleave', () => {
    deleteBtn.style.display = 'none'; // 非表示
  });

  return view;
};

/**
 * リストのビューを作成
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
 * リストのビューを描画
 *
 * @param {Array.<Object>} todos
 */
app.renderTodoList = () => {
  const container = document.querySelector('.todo-list-view-container');

  // todo をビューに変換
  const itemViews = app.todos.map(app.todoListItemView);

  lib.removeAllChild(container);
  container.appendChild(app.todoListView(itemViews));
};

// DOM を初期化
document.addEventListener('DOMContentLoaded', () => {
  // API からデータを取得
  api.fetchTodos().then(
    todos => {
      // データを追加して描画
      app.todos.push(...todos);
      app.renderTodoList();
    },
    errors => console.error(errors)
  );
});
