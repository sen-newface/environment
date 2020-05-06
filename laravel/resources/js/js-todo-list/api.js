import axios from 'axios';
export default {
  /**
   * データを API サーバから取得
   *
   * @return {Promise} todos
   */
  fetchTodos() {
    // TODO: 以下はモックなので axios で API サーバから取得する
    const todos = [
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

    return Promise.resolve(todos);
  }
}
