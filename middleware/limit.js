import  rateLimit  from "express-rate-limit";
export let limitGrt = () => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeader: false,
        skip: (req,res) => {//? los errores no cuentan como peticion
            if (req.headers["content-length"]>91) {
                res.status(413).send({ 
                    status:413, 
                    message: "El límite debe ser menor 91b" 
                });
                return true;
            }
        },
    message: (req,res) => {
        res.status(429).send({
        status: 429,
        message: "Ya se acabó tu tiempo",
        });
    },
    });
};