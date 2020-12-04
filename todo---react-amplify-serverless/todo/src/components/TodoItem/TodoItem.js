import React from 'react'

const TodoItem = ({ item }) => {
  return (
    <li>
      <label>
        <input type="checkbox"/>
        <span>{item.name}</span>
      </label>
    </li>
  )
}

export default TodoItem