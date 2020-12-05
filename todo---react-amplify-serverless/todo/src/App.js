import React, { useEffect, useState } from 'react'
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'
import * as subscriptions from './graphql/subscriptions'

Amplify.configure(awsconfig);

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await API.graphql(graphqlOperation(queries.listTodos))
      setTodos(result.data.listTodos.items)
    }

    fetchTodos()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.currentUserInfo();
      setUser(user)
      return user;
    };

    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      const onCreateTodoSubscription = API.graphql(graphqlOperation(subscriptions.onCreateTodo, { owner: user.username }))
        .subscribe({
          next: (result) => {
            const items = [...todos]
            items.push(result.value.data.onCreateTodo)
            setTodos(items)
          }
        })
      const onUpdateTodoSubscription = API.graphql(graphqlOperation(subscriptions.onUpdateTodo, { owner: user.username }))
        .subscribe({
          next: (result) => {
            const items = [...todos]
            const todo = result.value.data.onUpdateTodo
            const idx = items.findIndex((itm) => itm.id === todo.id);
            items[idx] = todo
            setTodos(items)
          }
        })
      
      return () => {
        onCreateTodoSubscription.unsubscribe()
        onUpdateTodoSubscription.unsubscribe()
      }
    }
  }, [user, todos])

  const logout = () => {
    Auth.signOut()
    window.location.reload()
  }
  const addTodo = async () => {
    const createTodoInput = { input: { name: newTodo, status: 'NEW' }}
    await API.graphql(graphqlOperation(mutations.createTodo, createTodoInput))
    setNewTodo('')
  }

  return (
    <div className="App">
      <main>
        <h1>TODO List</h1>
        <TodoList todos={todos} />
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add new todo</button>
      </main>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default withAuthenticator(App, {
  usernameAlias: 'email'
});
