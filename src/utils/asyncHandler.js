// Define a function named asyncHandler that takes a requestHandler function as an argument
const asyncHandler = (requestHandler) => {
    // Return a new function that serves as middleware for Express routes
    return (req, res, next) => {
        // Execute the requestHandler function and wrap it in a Promise
        Promise.resolve(requestHandler(req, res, next))
            // If the promise resolves successfully, do nothing
            .catch((err) => next(err)); // If the promise rejects (throws an error), pass that error to the next middleware or error handler
    };
};

export { asyncHandler }


``
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.status || error.code || 500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// export { asyncHandler };


// app.get('/example', (req, res, next) => {
//     try {
//         // Asynchronous operation
//         someAsyncOperation()
//             .then(result => res.json(result))
//             .catch(err => next(err)); // Pass error to error-handling middleware
//     } catch (err) {
//         next(err); // Pass synchronous errors to error-handling middleware
//     }
// });
