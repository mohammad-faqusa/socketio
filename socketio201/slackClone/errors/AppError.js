class AppError extends Error {
    constructor(message) {
        super(message); 
        this.name = 'App Error';
    }
}

module.exports = AppError; 