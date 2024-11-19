import React, { Component } from "react";
import UserForm from "./UserForm";
import "../styles/userList.css";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // User list
      showForm: false, // Toggle Add/Edit User form
      editingUser: null, // Holds user data for editing
    };
  }

  componentDidMount() {
    // Fetch predefined users from JSONPlaceholder
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const users = data.map((user) => ({
          id: user.id,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1] || "",
          email: user.email,
          department: user.company.name,
          description: user.company.catchPhrase,
        }));
        this.setState({ users });
      })
      .catch((error) => console.error("Error fetching users:", error));
  }

  handleAddUser = () => {
    this.setState({ showForm: true, editingUser: null });
  };

  handleSaveUser = (newUser) => {
    if (this.state.editingUser) {
      // Edit existing user
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.id === newUser.id ? newUser : user
        ),
        showForm: false,
        editingUser: null,
      }));
    } else {
      // Add new user
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
        showForm: false,
      }));
    }
  };

  handleEditUser = (user) => {
    this.setState({ editingUser: user, showForm: true });
  };

  handleDeleteUser = (userId) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== userId),
    }));
  };

  render() {
    const { users, showForm, editingUser } = this.state;

    return (
      <div>
        <h1>User Management</h1>
        {!showForm && (
          <>
            <button onClick={this.handleAddUser}>Add User</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>{user.description}</td>
                    <td>
                      <button onClick={() => this.handleEditUser(user)}>
                        Edit
                      </button>
                      <button onClick={() => this.handleDeleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {showForm && (
          <UserForm
            onSave={this.handleSaveUser}
            user={editingUser}
            onCancel={() => this.setState({ showForm: false })}
          />
        )}
      </div>
    );
  }
}

export default UserList;
