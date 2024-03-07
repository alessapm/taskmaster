import React, { useState } from 'react';

export default function Task({id, title, description, completed, handleUpdate}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({title, description, completed})
    
    const onTaskEdit = () => {
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
    
        setEditedTask((prevTask) => ({
          ...prevTask,
          [name]: inputValue,
        }));
      };
    
      const handleSaveEdit = () => {
        handleUpdate(id, editedTask);
        setIsEditing(false);
      };
    
      const handleCancelEdit = () => {
        setIsEditing(false);
      };

      return (
        <li key={id}>
          {!isEditing ? (
              <>
              <p>{title}</p>
              <p>{description}</p>
              <input type="checkbox" checked={completed} onChange={() => handleUpdate(id, { completed: !completed })} />
              <button onClick={onTaskEdit}>Edit</button>
            </>
          ) : (
            <>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleEditChange}
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
                  onChange={handleEditChange}
                />
              </label>
              <br />
              <label>
                Completed:
                <input
                  type="checkbox"
                  name="completed"
                  checked={editedTask.completed}
                  onChange={handleEditChange}
                />
              </label>
              <br />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          )}
        </li>
      );
    }