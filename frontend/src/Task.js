import React, { useState } from 'react';

export default function Task({id, title, description, completed, handleUpdate, handleDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({title, description, completed})
    
    const onTaskEdit = () => {
        setIsEditing(true);
    };

    const editChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
    
        setEditedTask((prevTask) => ({
          ...prevTask,
          [name]: inputValue,
        }));
      };
    
      const saveEdit = () => {
        handleUpdate(id, editedTask);
        setIsEditing(false);
      };
    
      const cancelEdit = () => {
        setIsEditing(false);
      };

      const onDeleteClick = () => {
        handleDelete(id);
      }

      return (
        <li key={id}>
          {!isEditing ? (
              <>
              <p>{title}</p>
              <p>{description}</p>
              <input type="checkbox" checked={completed} onChange={() => handleUpdate(id, { completed: !completed })} />
              <button onClick={onTaskEdit}>Edit</button>
              <button onClick={onDeleteClick}>Delete</button>
            </>
          ) : (
            <>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={editChange}
                  required
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={editedTask.description}
                  onChange={editChange}
                />
              </label>
              <br />
              <label>
                Completed:
                <input
                  type="checkbox"
                  name="completed"
                  checked={editedTask.completed}
                  onChange={editChange}
                />
              </label>
              <br />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          )}
        </li>
      );
    }