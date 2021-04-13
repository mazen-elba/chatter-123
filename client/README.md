State Management

1. initialize socket instance from socket.io-client
2. inside providers, create a constant ENDPOINT, and store back-end URL it
3. call io with ENDPOINT & other configurations to avoid CORS issues; io instance is exposed to entire app (accessed from anywhere)

- ChakraProvider: wrapper from ChakraUI
- MainProvider: holds user name & room name; accessed/changed throughout app
- UsersProvider: holds users present inside a room; accessed/updated throughout app
- SocketProvider: holds socket instance

Components

- Login:

1. opens socket event listener (inside a userEffect for users); will continuously listen to users event emitted from back-end whenever a new user is added
2. login fx is a validation method (checks if form is filled correctly or if username already exists)

- Chat:

1. useEffect checks if name state (from mainContext) is empty (if so, user will be redirected to login page)
2. useEffect will have 2 socket event listeners (for message & notification); whenever a message event is emitted (from back-end), listener stores the message in a messages array locally; whenever a notification event is mietted, it displays the notification message (from back-end)
3. handleSendMessage event emitters is triggered when user sends a message; which is picked up by back-end event listener (emits it again to entire room; broadcasting)
4. logout method clears username & room name; redirects user to login page
