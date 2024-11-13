// import React from "react";
// import { useState } from "react";

// const Todo = () => {
//   const [title, setTiltle] = useState("");
//   const [description, setDescription] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const apiUrl = "http://127.0.0.1:4000";

//   const handleSubmit = async () => {
//     if (title.trim() !== "" && description.trim() !== "") {
//       try {
//         const response = await fetch(apiUrl + "/todos", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ title, description }),
//         });

//         if (response.ok) {
//           setTodos([...todos, { title, description }]);
//           setMessage("Item added successfully");
//           setTimeout(()=>{setMessage("");},3000);
//           setError("");
//         } else {// you can delete this else condition
//           setError("Something went wrong with the request.");
//         }
//       } catch (error) {
//         setError("Failed to connect to the server.");
//         console.error("Error:", error);
//         setMessage("");

//       }
//     } else {
//       setError("Please fill out both fields.");
//       setMessage("");

//     }
//   };
//   return (
//     <>
//       <div className="row p-3 bg-success text-light">
//         <h1>ToDo Projects with MERN Stack</h1>
//       </div>
//       <div className="row">
//         <h3>Add items</h3>
//         {message && <p className="text-success">{message}</p>}
//         <div className="form-group d-flex gap-2">
//           <input
//             className="form-control"
//             placeholder="Title"
//             onChange={(e) => setTiltle(e.target.value)}
//             value={title}
//             type="text"
//           />
//           <input
//             className="form-control"
//             placeholder="Description"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//             type="text"
//           />
//           <button className="btn btn-dark" type="submit" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//       </div>
//     </>
//   );
// };

// export default Todo;
