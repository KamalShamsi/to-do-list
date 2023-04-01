import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  useQueryClient,
  useMutation,
} from 'react-query';
import deleteTodoRequest from '../api/deleteTodoRequest';
import updateTodoRequest from '../api/updateTodoRequest';
import { debounce } from 'lodash';
import { TokenContext } from '../App';

export const TodoItem = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState(todo.priority);
  const [token] = useContext(TokenContext);

  const queryClient = useQueryClient();

  const { mutate: updateTodo } = useMutation(
    (updatedTodo) => updateTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const { mutate: deleteTodo } = useMutation(
    (updatedTodo) => deleteTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const debouncedUpdateTodo = useCallback(
    debounce(updateTodo, 600),
    [updateTodo]
  );

  useEffect(() => {
    if (text !== todo.text || priority !== todo.priority) {
      debouncedUpdateTodo({
        ...todo,
        text,
        priority,
      });
    }
  }, [text, priority]);

  return (
    <div
      style={{
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        checked={todo.completed}
        type="checkbox"
        style={{
          marginRight: '5px',
          height: '34px',
          width: '34px',
        }}
        onChange={() =>
          updateTodo({
            ...todo,
            completed: !todo.completed,
          })
        }
      />

      <input
        style={{
          padding: '8px',
          marginRight: '6px',
        }}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
          marginRight: '6px',
        }}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button
        style={{
          padding: '5px',
          height: '35px',
          outline: 'none',
          border: 'none',
          color: 'white',
          backgroundColor: '#cc5a5a',
        }}
        onClick={() => deleteTodo(todo)}
      >
        delete
      </button>
    </div>
  );
};
