const Room = require('./Room')
const AppError = require('./../errors/AppError')

class Namespace { 
    constructor(id, name, ns, image) {
        this.id = id; 
        this.ns = ns;
        this.name = name; 
        this.image = image; 
        this.rooms = []
    }

    addRoom(roomObject) {
        if(roomObject instanceof Room)
            this.rooms.push(roomObject);
        else
            throw new AppError('the objecte to insert in rooms is not an object') 
    }
}


module.exports = Namespace; 