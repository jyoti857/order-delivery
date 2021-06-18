import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../dbConnect";
import User from "../model/User";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { firstName, lastName, email, password, confirmPassword } = body;
  console.log("method: ", method);
  await dbConnect();
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User is there in db" });
  }
  const newUser = await User.create({
    // firstName,
    // lastName,
    // email,
    // password,
    // confirmPassword,
    ...body,
  });

  res.json({ sd: { method, body, newUser } });
}
