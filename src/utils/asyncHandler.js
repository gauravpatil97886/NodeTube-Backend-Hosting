const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    }
}

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
