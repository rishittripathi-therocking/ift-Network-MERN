let users = []

const SocketServer = (socket) => {
    //Connect - Disconnect
    socket.on('joinUser', id => {
        users.push({id, socketId: socket.id});
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
    })

    //Likes 
    socket.on('likePost', newPost => {

        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient',newPost);
            })
        }
    })

    socket.on('unLikePost', newPost => {
        
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient',newPost);
            })
        }
    })

    //Comments
    socket.on('createComment', newPost => {
        //console.log(newPost);
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient',newPost);
            })
        }
    })

    socket.on('deleteComment', newPost => {
        //console.log(newPost);
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient',newPost);
            })
        }
    })

    // Follow 
    socket.on('follow', newUser => {
        const user = users.find( user => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser);
    })

}

module.exports = SocketServer;