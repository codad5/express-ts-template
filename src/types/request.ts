import { operations } from "@/src/types/operation"

export type GreetingRequest = {
    name: string
}

export type CalculatorRequest = {
    num1: number,
    num2: number,
    operation: operations
}

export type CreateUserRequest = {
    name: string,
    email: string,
    username: string
}

export type RequestDatas = GreetingRequest | CalculatorRequest | CreateUserRequest;