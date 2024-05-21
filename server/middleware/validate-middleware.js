const validate = (schema) => (req, res, next) => {
    try {
        const parseBody = schema.parse(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Please fill the input properly";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails,
        }
        // res.status(400).json({ msg: message });
        next(error)
    }
};

module.exports = validate;
