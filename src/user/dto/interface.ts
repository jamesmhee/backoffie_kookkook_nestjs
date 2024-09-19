export interface CreateUser {
    id: number
    username: string
    employee_id: string
    role_id: number
    branch_id: number
    first_name: string
    last_name: string
    nick_name: string
    date_of_birth: Date
    age: number
    sex: string
    phone_no: string
    identity_id: string
    email: string
    salary_base: number
    role: Role
    branch: Branch
  }
  
  export interface Role {
    id: number
    name: string
    list: string[] | {}
  }
  
  export interface Branch {
    id: number
    name: string
    province: string
    district: string
    sub_district: string
    postal_code: string
  }
  