import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoleModule } from './role/role.module';;
import { BranchModule } from './branch/branch.module';
import { CategoryModule } from './category/category.module';
import { TypeModule } from './type/type.module';
import { MenuModule } from './menu/menu.module';
import { ProductModule } from './product/product.module';
import { DiscountModule } from './discount/discount.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UserModule, AuthModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }), RoleModule, BranchModule, CategoryModule, TypeModule, MenuModule, ProductModule, DiscountModule, TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
