/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BranchMasterData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CategoryMasterData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `DiscountMasterData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MenuMasterData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ProductMasterData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `RoleMasterData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TypeMasterData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BranchMasterData_name_key" ON "BranchMasterData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryMasterData_name_key" ON "CategoryMasterData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DiscountMasterData_name_key" ON "DiscountMasterData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MenuMasterData_name_key" ON "MenuMasterData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductMasterData_name_key" ON "ProductMasterData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoleMasterData_name_key" ON "RoleMasterData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TypeMasterData_name_key" ON "TypeMasterData"("name");
