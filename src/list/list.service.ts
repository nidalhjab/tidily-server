import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/card/card.service';
import { List } from 'src/models/list.model';
import { Repository } from 'typeorm';
import { DeleteArgs } from './dto/deleteList.input';
import { GetUserLists } from './dto/getLists.input';
import { ListArgs } from './dto/newList';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly listRepo: Repository<List>,
        @Inject(forwardRef(() => CardService))
        private readonly cardService: CardService,
    ) { }
    async getUserLists(userListsId: GetUserLists) {
        const { userId, workSpaceId } = userListsId;
        try {
            return await this.listRepo.find({ where: { userId, workSpaceId } });
        } catch (err: any) {
            return { error: err }
        }
    }
    async addList(list: ListArgs) {
        try {
            return await this.listRepo.save(list);
        } catch (err: any) {
            return { error: err }
        }
    }

    async findList(id: number) {
        const response = await this.listRepo.findOne({ where: { id } });
        return response != null;
    }

    async editList(listData: ListArgs) {
        const { listId, listName, userId, workSpaceId } = listData;
        const existingList = await this.listRepo.findOne({
            where: {
                id: listId,
                userId,
                workSpaceId
            }
        });
        if (!existingList) {
            throw new HttpException('Invalid request', HttpStatus.NOT_FOUND);
        }
        try {
            existingList.listName = listName;
            await this.listRepo.update(listId, existingList)
            return existingList
        } catch (err) {
            return { error: err }
        }
    }

    async deleteList(id: DeleteArgs) {
        const listId = id.id;
        const existingList = await this.listRepo.findOne({ where: { id: listId } })
        if (!existingList) {
            throw new HttpException('Invalid request', HttpStatus.NOT_FOUND);
        }
        try {
            await this.cardService.deleteListCards(listId)
            await this.listRepo.delete(id);
            return existingList
        }
        catch (err) {
            return { error: err }
        }
    }
}
