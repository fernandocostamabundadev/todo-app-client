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

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
    setError('');
  };

  const saveEdit = async () => {
    try {
      const response = await api.put(`/${editingId}`, { title: editingTitle });
      setTodos(todos.map((todo) => (todo.id === editingId ? response.data : todo)));
      setEditingId(null);
      setEditingTitle('');
      setError('');
    } catch (err) {
      setError('Erro ao editar tarefa');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Lista de Tarefas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa"
          style={{ width: '70%', padding: 8 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '8px 12px' }}>
          Adicionar
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={(id, title) => (editingId === id ? saveEdit() : startEdit({ id, title }))}
            onDelete={handleDelete}
            isEditing={editingId === todo.id}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

