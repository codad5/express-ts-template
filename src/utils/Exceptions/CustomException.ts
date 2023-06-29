export default class CustomException extends Error {
    readonly code: number = 400;
    readonly data: any
    constructor(message: string, data: any, code: number = 500) {
        super(message);
        this.code = code;
        this.data = data
        Object.setPrototypeOf(this, CustomException.prototype);
    }
}
