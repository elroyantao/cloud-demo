import React from 'react'
import TodoItem from '../TodoItem/TodoItem'

const TodoList = ({ todos }) => {
  return (
    <div className="TodoList">
      <ul>
        {todos.map((item, i) => <TodoItem key={i} item={item} />)}
      </ul>
    </div>
  )
}

export default TodoList