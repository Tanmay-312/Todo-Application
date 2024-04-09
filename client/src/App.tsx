import { useState, useEffect } from 'react';
import { CheckCircleFillIcon } from '@primer/octicons-react';
import useSWR from 'swr';
import './App.css';
import AddTodo from './components/AddTodo';

// Define ENDPOINT
export const ENDPOINT = "http://localhost:4000";
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

// Define Todo type
export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

// App component
function App() {
  // State for storing todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch data on component mount
  const { data: fetchedData, mutate } = useSWR<Todo[]>('api/todos', fetcher);

  // Update todos when data is fetched
  useEffect(() => {
    if (fetchedData) {
      setTodos(fetchedData);
    }
  }, [fetchedData]);

  // Function to mark todo as done
  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todosn/${id}/done`, {
      method: 'PATCH',
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <div style={{ padding: '2rem', width: '100%', maxWidth: '40rem', margin: '0 auto' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={`todo_list__${todo.id}`}
            style={{
              marginBottom: '0.5rem',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => markTodoAdDone(todo.id)}
          >
            <span style={{ marginRight: '0.5rem' }}>
              {/* Use conditional rendering for icon */}
              {todo.done ? (
                <CheckCircleFillIcon size={24} fill="#28a745" />
              ) : (
                <CheckCircleFillIcon size={24} fill="#6c757d" />
              )}
            </span>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
      <AddTodo mutate={mutate} />
    </div>
  );
}

export default App;
