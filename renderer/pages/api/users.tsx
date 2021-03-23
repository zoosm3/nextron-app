import { NextApiRequest, NextApiResponse } from 'next'
import User from "../../user";

const users:User[] = [{ id: 1, name: 'A' }, { id: 2, name:'B' }, { id: 3, name: 'C' }]

export default(req:NextApiRequest, res:NextApiResponse) => {

    res.status(200).json(users)
}