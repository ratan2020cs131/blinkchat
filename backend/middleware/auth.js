import jwt from 'jsonwebtoken';
import UserQuery from '../query/user/query.js';
import Pool from '../database/connect.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send({ message: 'Unauthorised' })
            next();
        }
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const { rows } = await Pool.query(UserQuery.getUserById, [id])
        if (rows.length > 0) {
            req.user = rows[0];
            next();
        } else {
            res.status(401).send({ message: 'Unauthorised' });
        }
    } catch (err) {
        console.log("auth middleware error: ", err.message);
    }
}