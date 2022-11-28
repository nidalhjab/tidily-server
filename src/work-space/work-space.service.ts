import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSpace } from 'src/models/work-space';
import { Repository } from 'typeorm';
import { GetUserWorkSpaces } from './dto/getWorkSpaces';
import { WorkSpaceData } from './dto/newWorkSpace';

@Injectable()
export class WorkSpaceService {
    constructor(
        @InjectRepository(WorkSpace)
        private readonly workSpaceRepo: Repository<WorkSpace>
    ) { }

    async getAllWorkSpaces(workSpaceUserId: GetUserWorkSpaces) {
        const { userId } = workSpaceUserId;
        const response = await this.workSpaceRepo.find({ where: { userId } });
        return response
    }

    async addWorkSpace(workSpace: WorkSpaceData) {
        const { name } = workSpace;
        const existingName = await this.workSpaceRepo.findOne({ where: { name } });
        if (existingName) {
            throw new HttpException('Name Already exist', HttpStatus.CONFLICT);
        }
        try {
            return await this.workSpaceRepo.save(workSpace);
        } catch (err) {
            return { error: err }
        }

    }

    async deleteWorkSpace(id: number) {
        const existingWorkSpace = await this.workSpaceRepo.findOne({ where: { id } })
        if (!existingWorkSpace) {
            throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
        }
        try {
            await this.workSpaceRepo.delete(id);
            return existingWorkSpace
        } catch (err) {
            return { error: err }
        }
    }
}
