const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const [scheme, token] = authorization.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'A valid Bearer token is required' })
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById(_id).select('_id')
    if (!req.user) {
      return res.status(401).json({ error: 'Request is not authorized' })
    }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = requireAuth