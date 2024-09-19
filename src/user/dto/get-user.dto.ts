import { CreateUser, Role, Branch } from "../dto/interface"

export class GetUser implements CreateUser {    
    id: number;
    username: string;
    employee_id: string;
    password: string;
    is_active: boolean;
    role_id: number;
    branch_id: number;
    first_name: string;
    last_name: string;
    nick_name: string;
    date_of_birth: Date;
    age: number;
    sex: string;
    phone_no: string;
    identity_id: string;
    email: string;
    salary_base: number;
    role: Role;
    branch: Branch;
}