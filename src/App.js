import React, { Component } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

class App extends Component {
  state = {
    showForm: false,
    selectedUser: null,
  };

  toggleForm = (user = null) => {
    this.setState({ showForm: !this.state.showForm, selectedUser: user });
  };

  render() {
    const { showForm, selectedUser } = this.state;
    return (
      <div className="App">
        <ErrorBoundary>
          {!showForm ? (
            <UserList onOpenForm={this.toggleForm} />
          ) : (
            <UserForm
              user={selectedUser}
              onClose={this.toggleForm}
              onRefresh={() => window.location.reload()}
            />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
