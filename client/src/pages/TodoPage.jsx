import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';

import readTodosRequest from '../api/readTodosRequest';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoForm } from '../components/CreateTodoForm';
import { TokenContext } from '../App';

export const TodoPage = () => {
  const [token] = useContext(TokenContext);

  const { isLoading, data: todos } = useQuery('todos', () =>
    readTodosRequest(token)
  );

  const priorityOrder = ['high', 'medium', 'low'];
  const sortedTodos = todos?.slice().sort((a, b) => {
    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  });

  return (
    <div>
      <h1>Daily tasks:</h1>
      {isLoading ? (
        <ClipLoader size={150} />
      ) : (
        sortedTodos.map((todo) => (
          <TodoItem todo={todo} key={todo._id} />
        ))
      )}
      <CreateTodoForm />
    </div>
  );
};
