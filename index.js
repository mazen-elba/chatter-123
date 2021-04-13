const app = require("express")(); // initialize express app as a function handler
const http = require("http").createServer(app); // pass express app to http-server
const io = require("socket.io")(http); // initialize socket.io instance -> pass http-server as parameter
const cors = require("cors"); // connect:express middleware

const PORT = process.env.PORT || 5000;
const { addUser, getUser, deleteUser, getUsers } = require("./users");

app.use(cors());

/**
 * socket.in - will not include sender (ie; notification event emits for other user, not self)
 * io.in - includes sender & emitting event
 */

// Step 2 - Setup Socket Connection (invoke 'on' method with 'connection' and a callback fx)
// ... callback fx holds socket instance (user for emitting/listening to events)
// ... emitter events: socket.emit('event-name', data)
// ... listener events: socket.on('event-name', callback(data)); triggered from client
io.on("connection", (socket) => {
  // Event A - passes name & room (passed from client) -> passed them to addUser method with socket ID
  socket.on("login", ({ name, room }, callback) => {
    const { user, error } = addUser(socket.id, name, room);

    if (error) return callback(error);

    // Event A.a - user added successfully -> add user to room
    socket.join(user.room);

    // Event A.b - emits a message to client (displayed as notification)
    // ... event emitted only to users inside room
    socket.in(room).emit("notification", {
      title: "Someone's here",
      description: `${user.name} entered the room!`,
    });

    // Event A.c - emits updated user list to client
    io.in(room).emit("users", getUsers(room));

    callback();
  });

  // Event B - takes message from client
  socket.on("sendMessage", (message) => {
    const user = getUser(socket.io);

    // Event B.a - emits message in room with username & room name
    io.in(user.room).emit("message", { user: user.name, text: message });
  });

  // Event C - deletes user (by passing socket ID)
  socket.on("disconnect", () => {
    const user = deleteUser(socket.id);

    console.log(`User ${user.name} disconnected!`);

    if (user) {
      // Event C.a - emits notification message to user in room (broadcasts)
      io.in(user.room).emit("notification", {
        title: "Someone left the room!",
        description: `${user.name} left the room!`,
      });

      // Event C.b - updates list of users in room
      io.in(user.room).emit("users", getUsers(user.room));
    }
  });
});

// Step 1 - Initial Setup
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

http.listen(PORT, () => {
  console.log(`Server listening to ${PORT}`);
});
