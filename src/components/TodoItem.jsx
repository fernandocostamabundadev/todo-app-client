export function TodoItem({ todo, onToggle, onEdit, onDelete, isEditing, editingTitle, setEditingTitle }) {
  return (
    <li style={{ marginBottom: 12 }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />
          <button onClick={() => onEdit(todo.id)}>Salvar</button>
        </>
      ) : (
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: 8 }}>
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button onClick={() => onEdit(todo.id, todo.title)} style={{ marginLeft: 8 }}>
          Editar
        </button>
      )}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 8 }}>
        Excluir
      </button>
    </li>
  );
}
