import UserQuery from '../query/user/query.js';
import generateUiid from '../utils/uiid.js';
import Pool from '../database/connect.js';
import generateToken from '../utils/jwt.js';

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            const { rows: userExist } = await Pool.query(UserQuery.getUserByEmail, [email]);
            if (userExist.length > 0) {
                res.status(400).send({ message: "User alread exist" });
            } else {
                const id = generateUiid();
                const { rows } = await Pool.query(UserQuery.insertNewUser, [id, name, email, password])
                if (rows.length > 0) {
                    const token = generateToken(rows[0].id);
                    res.json({ token });
                } else {
                    res.status(400).send({ message: "Something went wrong" })
                }
            }
        } else {
            res.status(401).send({ message: "provide name, password, email correctly" })
        }
    } catch (err) {
        console.log("signup error: ", err.message);
        res.status(500).send({ message: err.message })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== '' && password !== '') {
            const { rows } = await Pool.query(UserQuery.getUserByEmail, [email]);
            if (rows.length > 0) {
                if (rows[0].password === password) {
                    const token = generateToken(rows[0].id);
                    res.status(200).send({ token })
                } else {
                    res.status(401).send({ message: 'Wrong Credentials' });
                }
            } else {
                res.status(404).send({ message: 'User do not exist' });
            }
        }
    } catch (err) {
        console.log("signup error: ", err.message);
        res.status(500).send({ message: err.message })
    }
}

const Profile = async (req, res) => {
    try {
        if (req.user)
            res.send(req.user);
    } catch (err) {
        console.log("Profile error: ", err.message);
        res.status(500).send({ message: err.message })
    }
}

export default {
    Signup,
    Login,
    Profile
}