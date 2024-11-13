import React from "react";
import { useState } from "react";
import { useEffect } from "react";


const Todo = () => {
  const [title, setTiltle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editId, setEditId] = useState(-1);
  // Edit
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDesciption] = useState("");

  const apiUrl = "http://127.0.0.1:4000";

  const handleSubmit = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        const response = await fetch(apiUrl + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
          setTodos([...todos, { title, description }]);
          setMessage("Item added successfully");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          setError("");
        } else {
          // you can delete this else condition
          setError("Something went wrong with the request.");
        }
      } catch (error) {
        setError("Failed to connect to the server.");
        console.error("Error:", error);
        setMessage("");
      }
    } else {
      setError("Please fill out both fields.");
      setMessage("");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todos")
      .then((response) => response.json())
      .then((response) => {
        setTodos(response);
      });
  };
  const handleUpdate =()=>{

  }
  
  const handleEdit = (item) => {
    setEditId(item._id); 
    setEditTitle(item.title); 
    setEditDesciption(item.description)
}

  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>ToDo Projects with MERN Stack</h1>
      </div>
      <div className="row">
        <h3>Add items</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
          <input
            className="form-control"
            placeholder="Title"
            onChange={(e) => setTiltle(e.target.value)}
            value={title}
            type="text"
          />
          <input
            className="form-control"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
          />
          <button className="btn btn-dark" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>

      <div className="row mt-3">
        <h3>Tasks</h3>
        <ul className="list-group ">
          {todos.map((item) => (
            <li
              className="list-group-item d-flex justify-content-between 
                align-items-center my-2 bg-info"
            >
              <div className="d-flex flex-column me-2">
                {editId == -1 || editId !== item._id ? (
                  <>
                    <span className="fw-bold">{item.title}</span>
                    <span>{item.description}</span>
                  </>
                ) : (
                  <>
                    <div className="form-group d-flex gap-2">
                      <input
                        placeholder="Title"
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        className="form-control"
                        type="text"
                      />
                      <input
                        placeholder="Description"
                        onChange={(e) => setEditDesciption(e.target.value)}
                        value={editDescription}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex gap-2">
                 {editId == -1 || editId !== item._id? <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(item)}>
                  Edit
                </button>: 
                <button 
                    className="btn btn-success"
                   onClick={()=>handleUpdate}>Update</button> }
                <button className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
