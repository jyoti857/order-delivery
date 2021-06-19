import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../dbConnect'
import User from '../model/User'
import * as argon from 'argon2'
import * as jwt from 'jsonwebtoken'
import * as util from 'util'

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const { firstName, lastName, email, password, confirmPassword } = body
  console.log('method: ', method)
  await dbConnect()
  const user = await User.findOne({ email })
  if (user) {
    return res.json({ message: 'User is there in db' })
  }
  const getRandomBytes = util.promisify
  const pas = await argon.hash(password, {raw: true, salt: "we"})
  const newUser = await User.create({
    ...body,
    passwrd: pas
  })
  res.json({ sd: { method, body, newUser } })
}
export async function loginUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    return res.json({ message: 'User of this email does not exist!' })
  }
  const veri = await argon.verify(existingUser.password, password)
  if(veri){
    const token = jwt.sign({userId: existingUser._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '2h'})
    res.json({
      userId: existingUser._id,
      token
    })
  }else{
    res.json({
      message: "password is not correct"
    })
  }
}

export async function deleteUserByEmail(req: NextApiRequest, res: NextApiResponse){
  console.log('req query --> ', req.query)
  const {email} = req.query
  const s = await User.findOneAndDelete({email})
  if(s){
    res.json({message: `user of email ${email} is deleted`, s})
  }res.json({message: 'no such user is there in db'})
}

