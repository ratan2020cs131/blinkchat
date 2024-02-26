import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config({ path: './.env' });

export default (id) => {
    try {
        let token = jwt.sign({ id: id }, process.env.SECRET_KEY);
        return token;
    }
    catch (err) {
        console.log("error generating token: ", err.message);
    }
}
