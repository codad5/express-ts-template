import redisClient from "@/services/redis";
import sendMessage from "@/services/mailer";
import twilioClient from "@/services/twilio";
import { randomBytes } from "crypto";

export function generateVerificationCode(): string {
    const buffer = randomBytes(3);
    const code = buffer.toString('hex').slice(0, 6);
    return code;
}

export async function sendPhoneVerificationCode(phoneNumber: string, code: string): Promise<void> {
    try {
        await twilioClient.messages.create({
            body: `Your verification code is ${code}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
        console.log(`Verification code sent to ${phoneNumber}`);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send verification code ' + (error as Error).message);
    }
}
export async function sendEmailVerificationCode(email: string, code: string){
    console.log(`Verification code sent to ${email}`, code);
    return await sendMessage({
        from: process.env.MAIL_ADDRESS,
        to: email,
        subject: 'Verification Code from clusterlearni',
        text: `Your verification code is ${code}`,
        html: `<p>Your verification code is <b>${code}</b></p>`
    })
}


export async function VerifyEmail(email: string, code: string) {
    let verified = await redisClient.get(`verification:${email}`) == code
    if(verified) await redisClient.set(`verified:${email}`, code, "EX", 60 * 5)
    return verified;
}

export async function isVerified(email:string) {
    return await redisClient.get(`verified:${email}`) != null
}

export async function codeSet(email: string){
    console.log("code :", await redisClient.get(`verification:${email}`) != null);
    return await redisClient.get(`verification:${email}`) != null
}
export async function setVerificationCode(phoneOrEmail: string){
    let code = generateVerificationCode()
    await redisClient.set(`verification:${phoneOrEmail}`, code, "EX", 60 * 10)
    return code
}
