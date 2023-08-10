import rateLimit from 'express-rate-limit';
export let limitGet = () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req, res) => {
            if(req.headers["content-length"]>=900) {
                res.status(413).send({
                    status: 413,
                    message: "El tamaño es incorrecto!"
                });
                return true;
            }
        },
        message: (req, res) => {
            res.status(429).send({
                status: 429,
                message: "Cantidad de Solicitudes Superadas",
            })
        },
    });
}
