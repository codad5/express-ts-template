export type User = {
    name: string,
    email: string,
    username: string
}

export type DocumentType<T> = T & Document;

export type UserDocument = DocumentType<User>;