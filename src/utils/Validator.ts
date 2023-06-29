import parsePhoneNumberFromString from "libphonenumber-js";
import {URL} from 'url'

export default class Validator {
    
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPhoneNumber(phoneNumber: string): boolean {
        const parsedNumber = parsePhoneNumberFromString(phoneNumber);
        return parsedNumber !== undefined && parsedNumber.isValid();
    }

    static isStrongPassword(password: string): boolean {
        // Password must contain at least one uppercase letter, one lowercase letter,
        // one digit, and one special character, and be at least 8 characters long.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    static isValidUrl(url: string) : boolean
    {
        try{
            new URL(url)
            return true
        }
        catch(e){
            return false
        }
    }
}
