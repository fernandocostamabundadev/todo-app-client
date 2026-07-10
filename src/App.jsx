import { useEffect, useState } from 'react';
import api from './services/api';
import { TodoItem } from './components/TodoItem';

function App(){
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [error, setError] = useState('');

  const loadTodos = async () => {
    try {
      const response = await api.get('/');
      setTodos(response.data);
    } catch (err) {
      setError('Não foi possível carregar as tarefas');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await api.post('/', { title });
      setTodos([...todos, response.data]);
      setTitle('');
      setError('');
    } catch (err) {
      setError('Erro ao adicionar tarefa');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa');
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await api.patch(`/${id}/toggle`);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (err) {
      setError('Erro ao alternar tarefa');
    }
  };
}
