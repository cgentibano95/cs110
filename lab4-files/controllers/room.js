const roomGenerator = require('../util/roomIdGenerator.js');
const Room = require('../models/Rooms');
const User = require('../models/Usernames');
const Messages = require('../models/Messages');
// Example for handle a get request at '/:roomName' endpoint.

function getRoom(request, response){
    if (request.params.roomName != 'favicon.ico'){
        var roomName = request.params.roomName;
        const newRoom = new Room(
                {
                    room_name: request.params.roomName,
                })
        newRoom
                .save()
                .then(item => console.log(item))
                .catch(err => console.log(err));
                response.cookie('roomName',roomName)
                response.render('room', {roomName: request.params.roomName});
            };   
}



module.exports = {
    getRoom,
};