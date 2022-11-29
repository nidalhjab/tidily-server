import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { WorkSpaceModule } from './work-space/work-space.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      cors: {
        origin: 'https://stately-marigold-a733a6.netlify.app/',
        credentials: true
      }
    }),
    TypeOrmModule.forRoot({
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      type: 'postgres',
    }),
    UserModule,
    AuthModule,
    ListModule,
    CardModule,
    WorkSpaceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
