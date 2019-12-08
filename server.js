const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const userController = require("./controllers/usersController");
const messageController = require("./controllers/messagesController");




var users = [];
var connections = [];

server.listen(process.env.PORT || 5001);


//route for home page
app.get('/', (req, res) =>
{
    res.sendfile(__dirname + "/index.html");
});
//route for public resources
app.use("/public", express.static(__dirname + "/src"));

io.sockets.on("connection", (socket) =>
{
    //set the connection
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected.`);
    //disconnect event handler.
    socket.on("disconnect", (data)=>
    {
        if (!socket.username)
        {
            return false;
        }

        users.splice(users.indexOf(socket.username), 1);
        updateUsersAndGroupsList(socket)
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Disconnected: ${connections.length} sockets connected.`);
    });

    //send message event handler.
    socket.on("sendMessage", async function(data)
    {
        let result = null;
        if (data.isGroupSession)
        {
            result = await messageController.saveInGroup(
                {
                    sourceId: socket.userId,
                    destinationId: data.destinationGroupId,
                    messageBody: data.messageBody
                });
        }
        else
        {
            result = await messageController.save(
            {
                sourceId: socket.userId,
                destinationId: data.destinationUserId,
                messageBody: data.messageBody
            });
        }
        if (result)
        {
            io.sockets.emit("newMessage", {msg: data.messageBody, user: socket.username});
        }
    });

    socket.on("login", async function(data, callback)
    {
        let result = await userController.isValidUser(data);

        if (!!result.length)
        {
            socket.username = data.username;
            socket.userId = result[0].id;
            users.push({username: socket.username, id: socket.userId});
            callback(
                {
                    isOk: true,
                    user: result[0]
                });
            updateUsersAndGroupsList(socket);
        }
        else
        {
            callback({
                isOk: false
            });
        }
    });

    socket.on("getChatHistory", async (data, callback)=>
    {
        if (data)
        {
            let result = null;
            if (!data.isInGroup)
            {
                result = await messageController.getChatHistory(data);
            }
            else
            {
                result = await messageController.getChatHistoryForGroup(data);
            }

            if (result)
            {
                callback(result);
            }
        }
    });

    async function updateUsersAndGroupsList(socket)
    {
        let allUsers = await userController.getAllUsers();
        let allGroups = await userController.getAllgroups(socket);

        let response = {};
        let usersList = [];
        if (allUsers)
        {
            for(user of allUsers)
            {
                user.isOnline = false;
                let foundOnline = users.find((element)=>
                {
                    return(element.id == user.id);
                })
                if (foundOnline)
                {
                    user.isOnline = true;
                }

                usersList.push(user);
            }
        }
        response.groups = allGroups;
        response.users = usersList;

        io.sockets.emit("getUsers", response);
    }
});
