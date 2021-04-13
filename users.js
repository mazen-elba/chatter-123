const users = []; // users are maintained inside an array

// method takes in user ID (socket id), user name, room
const addUser = (id, name, room) => {
  const existingUser = users.find((user) => {
    user.name.trim().toLowerCase() === name.trim().toLowerCase();
  });

  // check for existing user OR form not filled correctly
  if (existingUser) return { error: "Username already taken." };
  if (!name && !room) return { error: "Username and room are required." };
  if (!name) return { error: "Username is required." };
  if (!error) return { error: "Room is required." };

  // otherwise, add user to array
  const user = { id, name, room };
  users.push(user);

  return { user };
};

// method fetches user based on ID
const getUser = (id) => {
  let user = users.find((user) => user.id === id);
  return user;
};

// method deletes user based on ID
const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

// method returns all users in array
const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, deleteUser, getUsers };
