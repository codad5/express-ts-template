import { RequestDatas } from "./request"

export type SuccessResponse<T> = {
    success: true,
    code:number,
    message:string,
    data: T
}

export type ErrorResponse<T = null> = {
    success: false,
    code:number,
    message:string,
    recivedData ?: ErrorResponseData,
    data ?: T
}


export type ServerErrorResponse = {
    success: false,
    error: string,
    message: string,
    recivedData ?: SeverResponseData,
    code ?: number,
    data ?: SeverResponseData
}



export type GreetingResponse = {
    greeting: string
}

export type CalculatorResponse = {
    result: number
}

export type CreateUserResponse = {
    name: string,
    email: string,
    verified: boolean
}

export type CreateUserError = {
    name: string,
    email: string,
    verified: boolean

}
ex
export type ErrorResponseData = CreateUserError | {}
export type SuccessResponseDatas = GreetingResponse | CalculatorResponse | CreateUserResponse;

export type SeverResponseData = RequestDatas | {}

export type AllResponseDatas = SuccessResponseDatas | ErrorResponseData | SeverResponseData


export type NewResponse<T = AllResponseDatas> = SuccessResponse<T> | ErrorResponse<T> | ServerErrorResponse