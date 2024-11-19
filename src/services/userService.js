import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// export const addUser = async (user) => {
//   const response = await axios.post(API_URL, user);
//   return response.data;
// };
import axios from "axios";

const addUser = (newUser, users) => {
  // Generate a new ID based on the current max ID in the local list
  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1;

  // Assign the new ID to the user
  const userWithId = { ...newUser, id: newId };

  // Simulate sending a POST request
  return axios
    .post("https://jsonplaceholder.typicode.com/users", userWithId)
    .then((response) => {
      console.log("User added successfully:", response.data);
      return userWithId; // Return the locally updated user
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      throw error;
    });
};

export { addUser };

export const editUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
