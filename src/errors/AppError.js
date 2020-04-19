class AppError extends Error {
    constructor(messageCode,message){
        super(`${messageCode}:${message}`);

         // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }

}

module.exports = AppError