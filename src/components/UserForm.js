import React, { Component } from "react";
import "../styles/Form.css";

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      id: user?.id || Math.floor(Math.random() + 1),
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      department: user?.department || "",
      description: user?.description || "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      id,
      firstName,
      lastName,
      email,
      department,
      description,
    } = this.state;

    if (!firstName || !lastName || !email || !department) {
      alert("Please fill all fields!");
      return;
    }

    this.props.onSave({
      id,
      firstName,
      lastName,
      email,
      department,
      description,
    });
  };

  render() {
    const { firstName, lastName, email, department, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{this.props.user ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={department}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={this.props.onCancel}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
