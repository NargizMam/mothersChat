import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { imagesUpload } from '../multer';
const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);
usersRouter.post('/', imagesUpload.single('avatar'),async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? req.file.filename : null,
        });
        user.generateToken();
        await user.save();
        return res.send({ message: 'Успешная регистрация', user });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});
usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: 'Google register error!' });
        }

        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload['name'];
        const image = payload['picture'];
        console.log(id)
        if (!email) {
            return res.status(400).send({ error: 'Not enough user data to continue' });
        }

        let user = await User.findOne({ googleID: id });
        if (!user) {
            user = new User({
                email: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName: displayName ? displayName : email,
                avatar: image,
            });
        }
        console.log(user)

        user.generateToken();

        await user.save();
        return res.send({ message: 'Login with Google successful!', user });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        return next(e);
    }
});
usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(422).send({ error: 'Логин или пароль введен неверно!' });
        }
        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(422).send({ error: 'Логин или пароль введен неверно!' });
        }
        user.generateToken();
        await user.save();
        return res.send({ message: 'Логин и пароль верны!', user });
    } catch (e) {
        next(e);
    }
});
usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        const successMessage = { message: 'Success!' };
        if (!headerValue) {
            return res.send({ ...successMessage });
        }
        const [_bearer, token] = headerValue.split(' ');
        if (!token) {
            return res.send({ ...successMessage });
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.send({ ...successMessage });
        }
        user.generateToken();
        await user.save();
        return res.send({ ...successMessage, stage: 'Success' });
    } catch (e) {
        return next(e);
    }
});
export default usersRouter;
