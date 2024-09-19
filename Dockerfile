# ใช้ Node.js official image เป็น base image
FROM node:16-alpine

# สร้างและกำหนด directory ใน container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก Prisma schema ไปยัง container
COPY prisma ./prisma

# คัดลอก source code ทั้งหมดไปยัง container
COPY . .

# สร้างโปรเจกต์ NestJS
RUN npm run build

# สร้าง Prisma client โดยระบุ schema location
RUN npx prisma generate

# เปิดพอร์ตที่แอปพลิเคชันจะฟัง
EXPOSE 3399

# คำสั่งที่ใช้รันแอปพลิเคชันเมื่อ container ถูกสร้าง
CMD ["npm", "run", "start:prod"]
