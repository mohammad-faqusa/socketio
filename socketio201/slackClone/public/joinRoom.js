const joinRoom = (roomTitle, namespaceId) => {
    console.log(roomTitle, namespaceId)
    nameSpacesSockets[namespaceId].emit('joinRoom', roomTitle)
}