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
              <input type="checkbox" className='completed' checked={completed} onChange={() => handleUpdate(id, { completed: !completed })} />
              <div className='title-description'>
              <p>{title}</p>
              <p>{description}</p>
              </div>
              
              <button onClick={onTaskEdit}>Edit</button>
              <button onClick={onDeleteClick}>Delete</button>
            </>
          ) : (
            <><div className="edit-mode">
            
              <div className="title-description">
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
              </div>
              <br />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
              </div>
            </>
          )}
        </li>
      );
    }