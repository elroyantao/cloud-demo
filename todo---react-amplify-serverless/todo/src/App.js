import React, { useEffect, useState } from 'react'
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as queries from './graphql/queries'

Amplify.configure(awsconfig);

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await API.graphql(graphqlOperation(queries.listTodos))
      setTodos(result.data.listTodos.items)
    }

    fetchTodos()
  }, [])

  const logout = () => {
    Auth.signOut()
    window.location.reload()
  }

  console.log(todos)

  return (
    <div className="App">
      <main>
        <h1>TODO List</h1>
        <TodoList todos={todos} />
      </main>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default withAuthenticator(App, {
  usernameAlias: 'email'
});
