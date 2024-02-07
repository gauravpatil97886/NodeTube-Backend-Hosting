class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null; // Not sure what 'this.data' is intended for, as it's not initialized elsewhere in the constructor.
        this.success = false; // Assuming this is meant to be 'success' instead of 'sucess'.
        this.errors = errors; // Assigning the 'errors' parameter to the instance property correctly.

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor); // Correcting 'construct' to 'constructor' for capturing stack trace.
        }
    }
}

export {ApiError}