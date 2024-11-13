import { useEffect, useState } from "react";
import "./ToDoo.css"; // Import the custom CSS file

const ToDoo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDesciption] = useState("");
  const apiUrl = "http://127.0.0.1:4000";

  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            setTodos([...todos, { title, description }]);
            setTitle("");
            setDescription("");
            setMessage("Item added successfully");
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch(() => {
          setError("Unable to create Todo item");
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todos")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDesciption(item.description);
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/todos/" + editId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedTodos = todos.map((item) => {
              if (item._id === editId) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            });
            setTodos(updatedTodos);
            setEditTitle("");
            setEditDesciption("");
            setMessage("Item updated successfully");
            setTimeout(() => setMessage(""), 3000);
            setEditId(-1);
          } else {
            setError("Unable to update Todo item");
          }
        })
        .catch(() => {
          setError("Unable to update Todo item");
        });
    }
  };

  const handleEditCancel = () => setEditId(-1);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      fetch(apiUrl + "/todos/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      });
    }
  };

  return (
  <>
    <div className="background-wrapper">
      <div className="container">
          <div className="header">
            <h1>SET YOUR GOAL</h1>
          </div>
          <div className="form-section">
            <h3>Add Item</h3>
            <div className="form-group">
              <input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input"
                type="text"
              />
              <input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="input"
                type="text"
              />
              <button className="button submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {message && <p className="message-success">{message}</p>}
            {error && <p className="message-error">{error}</p>}
          </div>
          <div className="tasks-section">
            <h3>Tasks</h3>
            <div className="task-list">
              <ul>
                {todos.map((item) => (
                  <li className="task-item" key={item._id}>
                    <div className="task-content">
                      {editId === -1 || editId !== item._id ? (
                        <>
                          <span className="task-title">{item.title}</span>
                          <span className="task-desc">{item.description}</span>
                        </>
                      ) : (
                        <div className="form-group">
                          <input
                            placeholder="Title"
                            onChange={(e) => setEditTitle(e.target.value)}
                            value={editTitle}
                            className="input"
                            
                            type="text"
                          />
                          <input
                            placeholder="Description"
                            onChange={(e) => setEditDesciption(e.target.value)}
                            value={editDescription}
                            className="input"
                            type="text"
                          />
                        </div>
                      )}
                    </div>
                    <div className="task-actions">
                      {editId === -1 ? (
                        <>
                          <button className="button edit-button" onClick={() => handleEdit(item)}>
                            Edit
                          </button>
                          <button className="button delete-button" onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="button update-button" onClick={handleUpdate}>
                            Update
                          </button>
                          <button className="button cancel-button" onClick={handleEditCancel}>
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
         </div>
      </div>
    </div>
  </>
  );
}
export default ToDoo;