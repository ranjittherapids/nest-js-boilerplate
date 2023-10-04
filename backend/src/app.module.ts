import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig, TypeOrmConfig } from '@src/config';
import { ProductModule } from '@src/httpApi/modules';
import { RoutesMiddleware } from '@src/middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    JwtModule.register(JwtConfig),
    ProductModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoutesMiddleware).forRoutes('*');
  }
}
