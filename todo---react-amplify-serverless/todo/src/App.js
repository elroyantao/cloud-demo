import React, { useState } from 'react'
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {

  const [todos, setTodos] = useState([
    { name: 'Eat Breakfast', status: 'NEW' },
    { name: 'Workout', status: 'NEW' },
    { name: 'Meditate', status: 'NEW' }
  ])

  return (
    <div className="App">
      <main>
        <h1>TODO List</h1>
        <TodoList todos={todos} />
      </main>
    </div>
  );
}

export default withAuthenticator(App, {
  usernameAlias: 'email'
});
