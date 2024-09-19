/*
  Warnings:

  - Made the column `employee_id` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "employee_id" SET NOT NULL;
