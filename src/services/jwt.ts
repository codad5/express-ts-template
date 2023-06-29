import jwt from 'jsonwebtoken';

const JWT_SECRET : string = process.env.JWT_SECRET as string
export const generateToken = (payload : object, secret : string = '') : string => {
    return jwt.sign({...payload}, JWT_SECRET+secret.trim().toLowerCase(), {expiresIn: '30d'});
}


export const verifyToken = (token:string, secret : string = '') => {
    try{
        return jwt.verify(token, JWT_SECRET+secret.trim().toLowerCase())
    }catch(e){
        return false
    }
}

