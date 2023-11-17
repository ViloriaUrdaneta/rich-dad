export interface User {
    id: string,
    name: string
    email: string
}

export interface Notebook {
    id: string,
    name: string,
    user_id: string
}

export interface NotebookDTO {
    message: string,
    result: Notebook[],
}