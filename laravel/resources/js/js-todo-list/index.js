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
 * Todo を置き換える
 */
app.replectTodo = todo => {
  const index = app.todos.findIndex(t => t.id === todo.id);
  app.todos.splice(index, 1, todo);
};

/**
 * Todo を更新
 */
app.updateTodos = todos => {
  app.todos = todos;
};

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
 * 追加用フォームのビューを生成 & 初期化
 */
app.initAddFormView = () => {
  const view = app.template('todo-add-form');
  const desc = view.querySelector('.todo-add-desc');
  const addBtn = view.querySelector('.todo-add-btn');

  addBtn.addEventListener('click', () => {
    if (desc.value === '') {
      return;
    }

    api.addTodo(desc.value)
      .then(todo => {
        app.todos.push(todo);
        app.renderTodoList();
        desc.value = '';
      })
      .catch(() => {
        console.error('追加に失敗しました');
      });
  });

  document
    .querySelector('.todo-add-form-container')
    .appendChild(view);
};

/**
 * フィルタのビューを生成 & 初期化
 */
app.initFilterView = () => {
  const view = app.template('todo-filter');

  const btns = {
    all: view.querySelector('.all-btn'),
    active: view.querySelector('.active-btn'),
    completed: view.querySelector('.completed-btn'),
  };

  const toActive = name => {
    Object.values(btns).forEach(btn => btn.classList.remove('active'));
    btns[name].classList.add('active');
  };

  btns.all.addEventListener('click', () => {
    app.renderTodoList();
    toActive('all');
  });
  btns.active.addEventListener('click', () => {
    app.renderTodoList(app.todos.filter(todo => !todo.is_completed));
    toActive('active');
  });
  btns.completed.addEventListener('click', () => {
    app.renderTodoList(app.todos.filter(todo => todo.is_completed));
    toActive('completed');
  });

  document
    .querySelector('.todo-filter-container')
    .appendChild(view);
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
  checkbox.addEventListener('change', () => {
    api.updateTodo({ ...todoItem, is_completed: checkbox.checked })
      .then(todo => {
        app.replectTodo(todo);
        app.renderTodoList();
      })
      .catch(() => {
        console.error('完了ステータスの更新に失敗しました');
        checkbox.checked = !checkbox.checkbox;
      });
  });

  // 削除ボタンの初期化
  const deleteBtn = view.querySelector('.todo-delete-btn');
  deleteBtn.style.display = 'none';

  // クリック時に削除
  deleteBtn.addEventListener('click', () => {
    api.deleteTodo(todoItem.id)
      .then(() => {
        app.updateTodos(app.todos.filter(t => t.id !== todoItem.id));
        app.renderTodoList();
      })
      .catch(() => {
        console.error('削除に失敗しました');
      });
  });

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
app.renderTodoList = (todos = null) => {
  const container = document.querySelector('.todo-list-view-container');

  // todo をビューに変換
  const itemViews = (todos || app.todos).map(app.todoListItemView);

  lib.removeAllChild(container);
  container.appendChild(app.todoListView(itemViews));
};

// DOM を初期化
document.addEventListener('DOMContentLoaded', () => {
  app.initAddFormView();
  app.initFilterView();

  // API からデータを取得
  api.fetchTodos().then(
    todos => {
      // データを追加して描画
      app.updateTodos(todos);
      app.renderTodoList();
    },
    errors => console.error(errors)
  );
});
