module.exports = (schema) => (req, res, next) => {
    const errors = [];

    for (let key in schema) {
        const rules = schema[key].split("|");

        rules.forEach((rule) => {
            if (rule === "required" && !req.body[key]) {
                errors.push(`${key} is required`);
            }

            if (rule === "email" && req.body[key]) {
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(req.body[key])) {
                    errors.push(`${key} must be valid email`);
                }
            }
        });
    }

    if (errors.length)
        return res.status(400).json({ errors });

    next();
};