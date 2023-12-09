import bcrypt from 'bcrypt';
import { Request } from 'express';
 

export function hashPassword(password: string, saltRounds = 10){
    const salt =  bcrypt.genSaltSync(saltRounds);
    const hash =  bcrypt.hashSync(password, salt);
    return hash;
}

export async function verifyPassword(password: string , hash: string)
{
    return bcrypt.compareSync(password, hash)
}

export function setBaseURL(req: Request) {
    const protocol = req.protocol;
    const host = req.hostname
    const port = req.socket.localPort
    const BASE_URL = `${protocol}://${host}${port == 80 || port == 443 || port == undefined ? '' : `:${port}`}`
    process.env.BASE_URL = BASE_URL
}