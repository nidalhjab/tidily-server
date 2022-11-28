import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from 'src/card/card.module';
import { List } from 'src/models/list.model';
import { ListResolver } from './list.resolver';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List]), forwardRef(() => CardModule)],
  providers: [ListResolver, ListService],
  exports: [ListService]
})
export class ListModule { }
