import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/manager/UsersManager.mongo.js";
import { createToken } from "../utils/token.util.js"

passport.use("register", new LocalStrategy (
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            if (!email || !password) {
                const error = new Error("Please enter email and password")
                error.statusCode = 401;
                return done(null, null, error);
            }
            const one = await usersManager.readByEmail(email)
            if (one) {
                const error = new Error("Bad auth from register")
                error.statusCode = 401;
                return done(error);
            }
            const hashPassword = createHash(password);
            const newUser = {
                email,
                password: hashPassword,
                ...(req.body.age && { age: req.body.age }),
                ...(req.body.photo && { photo: req.body.photo })
            };
            const user = await usersManager.create(newUser);
            return done(null, user);
        } catch (error) {
            return done (error);
        }
    }
));

passport.use("login", new LocalStrategy (
    { passReqToCallback: true, usernameField: "email"},
    async (req, email, password, done) => {
        try {
            const one = await usersManager.readByEmail(email);
            if (!one) {
                const error = new Error("Bad auth from login");
                error.statusCode = 401;
                return done (error);
            }
            const verify = verifyHash(password, one.password);
            if (verify) {
                const user = { email, role: one.role, photo: one.photo, _id: one._id, online: true};
                const token = createToken(user)
                user.token = token
                return done(null, user)
            }
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            return done (error);
        } catch (error) {
            return done (error);
        }
    }
))

passport.use("google", new GoogleStrategy(
    { clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, callbackURL: "http://localhost:8080/api/sessions/google/callback", passReqToCallback: true},
    async (req, accesToken, refreshToken, profile, done) => {
        try {
            const {id, picture} = profile
            console.log(profile);
            let user = await usersManager.readByEmail(id)
            if (!user) {
                user = {
                    email: id,
                    password: createHash(id),
                    photo: picture,
                };
                user = await usersManager.create(user)
            }
            req.session.email = user.email;
            req.session.role = user.role;
            req.session.photo = user.photo;
            req.session.online = true;
            req.session.user_id = user._id;
            return done(null, user)
        } catch (error) {
            return done (error);
        }
    }
))

passport.use("jwt", new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
        secretOrKey: process.env.SECRET_JWT
    },
    (data, done) => {
        try {
            if (data) {
                //console.log("JWT Data:", data);
                return done(null, data)
            } else {
                const error = new Error("forbidden from jwt");
                error.statusCode = 403;
                return done (error);
            }
        } catch (error) {
            return done(error)
        }
    }
))

export default passport;