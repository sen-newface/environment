import axios from 'axios';

// TODO: 以下はモックなので axios で API サーバから取得する
const mockTodos = [
  {
    id: 1,
    description: 'Example 1, active todo description.',
    is_completed: false,
  },
  {
    id: 2,
    description: 'Example 2, active todo description.',
    is_completed: false,
  },
  {
    id: 3,
    description: 'Example 3, completed todo description.',
    is_completed: true,
  },
];

export default {
  /**
   * 取得
   *
   * @return {Promise} todos
   */
  fetchTodos() {
    // TODO: API 使う
    return Promise.resolve([...mockTodos]);
  },

  /**
   * 追加
   *
   * @return {Promise} todo
   */
  addTodo(description, isCompleted = false) {
    // TODO: API 使う

    const newTodo = {
      id: Math.max(...mockTodos.map(todo => todo.id)) + 1,
      description,
      is_completed: isCompleted,
    };
    mockTodos.push(newTodo);

    return Promise.resolve(newTodo);
  },

  /**
   * 更新
   *
   * @return {Promise} todo
   */
  updateTodo(todo) {
    // TODO: API 使う

    mockTodos[mockTodos.findIndex(t => t.id === todo.id)] = todo;

    return Promise.resolve(todo);
  },

  /**
   * 削除
   *
   * @return {Promise}
   */
  deleteTodo(todo) {
    // TODO: API 使う

    mockTodos.splice(mockTodos.findIndex(t => t.id === todo.id), 1);

    return Promise.resolve();
  },
}
