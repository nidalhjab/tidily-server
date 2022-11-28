import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkSpace } from 'src/models/work-space';
import { GetUserWorkSpaces } from './dto/getWorkSpaces';
import { WorkSpaceData } from './dto/newWorkSpace';
import { WorkSpaceService } from './work-space.service';

@Resolver()
export class WorkSpaceResolver {
    constructor(private readonly workSpaceService: WorkSpaceService) { }

    @Query(() => [WorkSpace])
    async getAllWorkSpaces(@Args('GetUserWorkSpaces') workSpaceUserId: GetUserWorkSpaces) {
        return this.workSpaceService.getAllWorkSpaces(workSpaceUserId);
    }
    @Mutation(() => WorkSpace)
    async addNewWorkSpace(@Args('workSpace') workSpace: WorkSpaceData) {
        return this.workSpaceService.addWorkSpace(workSpace)
    }

    @Mutation(() => WorkSpace)
    async deleteWorkSpace(@Args({ name: 'id', type: () => Int }) id: number) {
        return this.workSpaceService.deleteWorkSpace(id);
    }
}
