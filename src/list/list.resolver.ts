import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { List } from 'src/models/list.model';
import { DeleteArgs } from './dto/deleteList.input';
import { GetUserLists } from './dto/getLists.input';
import { ListArgs } from './dto/newList';
import { ListService } from './list.service';

@Resolver()
export class ListResolver {
    constructor(private readonly listService: ListService) { }

    @Query(() => [List])
    async getLists(@Args('GetUserLists') userLists: GetUserLists) {
        return await this.listService.getUserLists(userLists);
    }

    @Mutation(() => List)
    async addNewList(@Args('listInfo') listInfo: ListArgs) {
        return await this.listService.addList(listInfo);
    }

    @Mutation(() => List)
    async editList(@Args('listInfo') listInfo: ListArgs) {
        return await this.listService.editList(listInfo)
    }

    @Mutation(() => List)
    async deleteList(@Args('listInfo') id: DeleteArgs) {
        return await this.listService.deleteList(id)
    }

}
