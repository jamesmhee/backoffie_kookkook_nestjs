-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "employee_id" TEXT,
    "role_id" INTEGER,
    "branch_id" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "nick_name" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "age" INTEGER,
    "sex" TEXT,
    "phone_no" TEXT,
    "identity_id" TEXT,
    "email" TEXT,
    "salary_base" DOUBLE PRECISION,
    "latest_login" TIMESTAMP(3),
    "token" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "list" JSONB,

    CONSTRAINT "RoleMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "created_date" TIMESTAMP(3),
    "latest_update" TIMESTAMP(3),

    CONSTRAINT "MenuMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "province" TEXT,
    "district" TEXT,
    "sub_district" TEXT,
    "postal_code" TEXT,

    CONSTRAINT "BranchMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "detail" TEXT,
    "sale" DOUBLE PRECISION,
    "cost_price" DOUBLE PRECISION,
    "quantity" INTEGER,
    "category_id" INTEGER,
    "type_id" INTEGER,
    "branch_id" INTEGER,

    CONSTRAINT "ProductMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "CategoryMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "TypeMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountMasterData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" INTEGER,
    "percent" INTEGER,
    "total" INTEGER,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN,

    CONSTRAINT "DiscountMasterData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderTransaction" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "employee_id" INTEGER,
    "datetime" TIMESTAMP(3),
    "discount" INTEGER,
    "total_price_sold" INTEGER,
    "description" TEXT,
    "type" TEXT,

    CONSTRAINT "OrderTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "RoleMasterData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "BranchMasterData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMasterData" ADD CONSTRAINT "ProductMasterData_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CategoryMasterData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMasterData" ADD CONSTRAINT "ProductMasterData_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeMasterData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMasterData" ADD CONSTRAINT "ProductMasterData_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "BranchMasterData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductMasterData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
