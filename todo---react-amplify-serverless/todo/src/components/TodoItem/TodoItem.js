import { API, graphqlOperation } from 'aws-amplify'
import React from 'react'
import * as mutations from '../../graphql/mutations'

const TodoItem = ({ item }) => {
  const updateTodo = async (e) => {
    const todoStatus = e.target.checked ? 'DONE' : 'NOT DONE'
    const updateTodoInput = {
      input: {
        id: item.id,
        name: item.name,
        status: todoStatus
      }
    }
    await API.graphql(graphqlOperation(mutations.updateTodo, updateTodoInput))
  }
  return (
    <li>
      <label>
        <input type="checkbox" checked={item.status === 'DONE'} onChange={updateTodo} />
        <span>{item.name}</span>
      </label>
    </li>
  )
}

export default TodoItem