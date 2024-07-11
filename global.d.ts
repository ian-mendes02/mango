type MenuItemData = {
    id: number,
    title: string,
    price: string,
    description?: string,
    options?: string,
    showinreduced: boolean;
    categories: string;
};

type StatusMessage = {
    status?: any,
    message?: string,
    data?: any
}

type UserData = {
    id?: number,
    name?: string, 
    role?: string, 
    password: string, 
    email: string
}