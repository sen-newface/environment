<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>TodoList</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/colors/3.0.0/css/colors.min.css">
  <link rel="stylesheet" href="{{ asset('css/js-todo-list.css') }}">
</head>
<body>
  <div class="ui container">
    <header class="ui header">
      <i class="tasks icon"></i>
      <div class="content">
        Simple Todo List
        <div class="sub header">Implemented in Vanilla JS</div>
      </div>
    </header>

    <!-- Form for adding items -->
    <div class="todo-add-form ui fluid action input">
      <input type="text" placeholder="What needs to be done?">
      <button class="todo-add-btn block ui basic button">Add</button>
    </div>

    <!-- Filters -->
    <div class="todo-filters ui right floated basic tiny buttons">
      <button class="all-btn ui button active">all</button>
      <button class="active-btn ui button">active</button>
      <button class="completed-btn ui button">completed</button>
    </div>

    <div class="todo-list-view-container"></div>
  </div>

  <div class="templates">
    <!-- List item -->
    <div class="todo-list-item-view flex ui segment">
      <div class="ui checkbox">
        <input class="completion-checkbox" type="checkbox">
        <label></label>
      </div>
      <span class="todo-description">Todo description here</span>
      <span class="todo-delete-btn em-8 b-right red">delete</span>
    </div>

    <!-- List -->
    <div class="todo-list-view clear ui huge segments"></div>
  </div>
  <script src="{{ asset('js/js-todo-list/index.js') }}"></script>
</body>
</html>
