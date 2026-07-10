import { useEffect, useState } from 'react';
import api from './services/api';
import { TodoItem } from './components/TodoItem';

function App(){
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [error, setError] = useState('');
}
