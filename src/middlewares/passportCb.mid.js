import passport from "passport";

function passportCb(strategy) {
    return (req, res , next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                //console.error("Passport Error:", error);
                return next(error);
            }
            if (user) {
                //console.log("Authenticated User:", user); 
                req.user = user;
                return next();
            }
            return res.json({
                statusCode: info.statusCode || 401,
                message: info.message ? info.message : info.toString
            })
        })(req, res, next);
    }
}

export default passportCb;