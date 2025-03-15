
class Orb {
    constructor(settings){
        this.color = this.getRandomColor(); 
        this.locX = Math.floor(Math.random() * settings.worldWidth); // h axis
        this.locY = Math.floor(Math.random() * settings.worldHeight); // v axis 
        this.radius = settings.defualtGenericOrbSize; // generic orb
    }

    getRandomColor(){
        const r = Math.floor(Math.random() * 200 + 50)
        const g = Math.floor(Math.random() * 200 + 50)
        const b = Math.floor(Math.random() * 200 + 50)

        return `rgb(${r},${g},${b})`
    }
}

module.exports = Orb