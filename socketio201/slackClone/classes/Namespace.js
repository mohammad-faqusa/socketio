class Namespace{ 

    constructor(id, name, image, endpoint) {
        this.id = id ;
        this.name = name ;
        this.image = image ;
        this.endpoint = endpoint ;
        this.rooms = []; 
    }

    addRoom(roomObject) {
        this.rooms.push(roomObject)
    }
}

module.exports = Namespace