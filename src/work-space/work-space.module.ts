import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSpace } from 'src/models/work-space';
import { WorkSpaceResolver } from './work-space.resolver';
import { WorkSpaceService } from './work-space.service';


@Module({
  imports: [TypeOrmModule.forFeature([WorkSpace])],
  providers: [WorkSpaceResolver, WorkSpaceService]
})
export class WorkSpaceModule { }
