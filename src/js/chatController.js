var socket = io.connect();
var $messageForm = $("#messageForm");
var $message = $("#message");
var $chat = $("#chat");
var $users = $("#users");
var $groups = $("#groups");

var $userFormArea = $("#userFormArea");
var $loginForm = $("#loginForm");
var $messageArea = $("#messageArea");
var $username = $("#username");
var $password = $("#password");

var currentUser = null;
var currentDestinationGroup = null;

//to hold the user who will recive the message.
var currentDestinationUser = null;

//to check whether the user is chating in a group.
var isGroupSession = false;



$messageForm.submit((event)=>
{
    event.preventDefault();
    if ($message.val() == "")
    {
        return false;
    }

    if (isGroupSession)
    {
        socket.emit("sendMessage", {messageBody: $message.val(), destinationGroupId: currentDestinationGroup.id, isGroupSession});
    }
    else
    {

        socket.emit("sendMessage", {messageBody: $message.val(), destinationUserId: currentDestinationUser.id});
    }
    $message.val("");
});

$userFormArea.submit( function(event)
{
    event.preventDefault();
    socket.emit("login", {username: $("#username").val(), password: $("#password").val()}, function(response){
        if (response.isOk)
        {
            $userFormArea.hide();
            $messageArea.show();
            currentUser = response.user;
            $("#headerName").html(`Welcome ${currentUser.username}`);
        }
        else
        {
            alert("sorry user name or password invalid. please try again");
        }
    });
});

socket.on("newMessage", (data)=>
{
    $chat.append(`<div class="card card-body bg-light m-2 d-flex flex-row"><b>${data.user}: </b><span class="d-inline">${data.msg}</span></div>`);
    // $chat.animate({
	// 	scrollTop: $chat.find(".card").last().offset().top
	// },1000);
});

socket.on("getUsers", (data)=>
{
    let html = "";
    for (let user of data.users)
    {
        if (user.id == currentUser.id)
        {
            continue;
        }
        html += `<li class="list-group-item my-1 d-flex flex-row justify-content-between" id="${user.id}"><span>${user.username}</span><i class="fa fa-dot-circle-o ${user.isOnline ? "text-success" : "text-secondary"}" aria-hidden="true"></i></li>`;
    }

    if (html == "")
    {
        html = "No online user. Please stay online..";
    }
    $users.html(html);

    html = ``;
    for (let group of data.groups)
    {
        html += `<li class="list-group-item my-1 d-flex flex-row justify-content-between" id="${group.id}">${group.name}</li>`;
    }
    $groups.html(html);
});

$users.on("click", "li", (event)=>
{
    currentDestinationUser = 
    {
        id: parseInt($(event.target).attr("id")),
        name: $(event.target).find("span").html()
    };

    $("#currentDestinationViewer").html(`<i class="fa fa-user-circle-o" aria-hidden="true" style="font-size: 1.5em;"></i><span class="ml-2 font-weight-bold">${currentDestinationUser.name}</span>`);
    isGroupSession = false;
    socket.emit("getChatHistory", {sourceId: currentUser.id, destinationId: parseInt($(event.target).attr("id"))}, function(chats)
    {
        if (chats)
        {
            let html = "";
            for(let chat of chats)
            {
                html += `<div class="card card-body bg-light m-2 d-flex flex-row"><b>${chat.source}: </b><span class="d-inline">${chat.message_body}</span></div>`;
            }

            $chat.html(html);
        }
    });
});

$groups.on("click", "li", (event)=>
{
    currentDestinationGroup = 
    {
        id: parseInt($(event.target).attr("id")),
        name: $(event.target).html()
    };

    $("#currentDestinationViewer").html(`<i class="fa fa-users" aria-hidden="true" style="font-size: 1.5em;"></i><span class="ml-2 font-weight-bold">${currentDestinationGroup.name}</span>`);

    isGroupSession = true;
    socket.emit("getChatHistory", {sourceId: currentUser.id, groupId: parseInt($(event.target).attr("id")), isInGroup: true}, function(chats)
    {
        if (chats)
        {
            let html = "";
            for(let chat of chats)
            {
                html += `<div class="card card-body bg-light m-2 d-flex flex-row"><b>${chat.source}: </b><span class="d-inline">${chat.message_body}</span></div>`;
            }

            $chat.html(html);
        }
    });
});
