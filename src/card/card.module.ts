import { Module, forwardRef } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/models/card.model';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => ListModule)],
  providers: [CardService, CardResolver],
  exports: [CardService]
})
export class CardModule { }
