import {jwtDecode} from 'jwt-decode'


const getMe = async (req, res) => {
    try {
        const user = jwtDecode(req.cookies.token);
        res.json({ status: true, user })
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}

export {
    getMe
}