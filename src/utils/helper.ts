import bcrypt from 'bcrypt';
 

export function hashPassword(password: string, saltRounds = 10){
    const salt =  bcrypt.genSaltSync(saltRounds);
    const hash =  bcrypt.hashSync(password, salt);
    return hash;
}

export async function verifyPassword(password: string , hash: string)
{
    return bcrypt.compareSync(password, hash)
}