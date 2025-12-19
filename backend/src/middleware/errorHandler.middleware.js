const errorHandler = (err, req, res, next) => {
    console.error(err);

    return res.status(400).json({
        message: err.message,
    });
};

export default errorHandler;
