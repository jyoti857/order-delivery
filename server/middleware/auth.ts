import jwt, { JwtPayload } from 'jsonwebtoken'

export const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken: JwtPayload | string = jwt.verify(
      token,
      'RANDOM_TOKEN_SECRET',
    )
    const userId =
      typeof decodedToken !== 'string' ? decodedToken.userId : decodedToken
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID'
    } else {
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
  }
}
