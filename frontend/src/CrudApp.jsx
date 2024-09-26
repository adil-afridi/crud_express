import React, { useState, useEffect } from "react";

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch items from the backend
  const fetchItems = async () => {
    const response = await fetch("http://localhost:3000/items");
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing item
      await fetch(`http://localhost:3000/items/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Update the items array to reflect the changes
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === currentId ? { ...item, ...formData } : item
        )
      );
      setIsEditing(false);
    } else {
      // Add new item
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newItem = await response.json();
      setItems((prevItems) => [...prevItems, newItem]);
    }
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="container">
      <h1>CRUD Application</h1>

      {/* Form for Creating and Updating */}
      <form onSubmit={handleSubmit} className="form mt-5 mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control my-3"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="d-grid gap-2 col-12 mx-auto">
          <button className="btn btn-sm btn-block btn-success" type="submit">
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* Display List of Items in a Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {" "}
              {/* Ensure that item.id is unique */}
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(item)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger mx-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudApp;
