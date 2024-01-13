import db from '../models/index.js'
import jwt from 'jsonwebtoken'

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.clearCookie('token');
    return res.json({ status: false , message : 'UnAuthorized Request. User Not LoggedIn' })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false , message : 'Session Expired'})
    } else {
      req.user =  data.id;
      next()
    }
  })
}
export default authMiddleWare