import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListService } from 'src/list/list.service';
import { Card } from 'src/models/card.model';
import { Repository } from 'typeorm';
import { CardInfo } from './dto/cardInfo.input';
import { DeleteCardArgs } from './dto/deleteCard';
import { GetUserCards } from './dto/getCards.input';
import { MemberInfo } from './dto/member.info';
import { CardsUpdates } from './dto/update';

@Injectable()
export class CardService {
    constructor(@InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
        @Inject(forwardRef(() => ListService))
        private readonly listService: ListService,
    ) { }

    async getAllCards(cardUserId: GetUserCards) {
        const { userId, workSpaceId } = cardUserId;
        try {
            return await this.cardRepo.find({ where: { userId, workSpaceId } });
        } catch (err) {
            return { error: err }
        }
    }

    async addNewCard(cardInfo: CardInfo) {
        const existingList = await this.listService.findList(cardInfo.listId);
        if (!existingList) {
            throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.cardRepo.save({ ...cardInfo, memberName: null });
        } catch (err) {
            return { error: err }
        }
    }

    async deleteCard(cardInfo: DeleteCardArgs) {
        const { userId, cardId } = cardInfo;
        const existingCard = await this.cardRepo.findOne({ where: { userId, id: cardId } })
        if (!existingCard) {
            throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
        }
        try {
            await this.cardRepo.delete(cardId);
            return await this.cardRepo.find({ where: { userId } })

        } catch (err) {
            return { error: err }
        }
    }

    async updateCard(cardInfo: CardInfo) {
        const { comment, description, listId, title, userId } = cardInfo;
        let existingCard = await this.cardRepo.findOne({ where: { userId, listId } });
        if (!existingCard) {
            throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
        }
        try {
            existingCard = { ...cardInfo, id: existingCard.id }
            await this.cardRepo.update(existingCard.id, cardInfo);
            const updatedCards = await this.cardRepo.find({ where: { userId } })
            return updatedCards
        } catch (err) {
            return { error: err }
        }
    }

    async updateCardsOrder(cards: CardsUpdates[]) {
        try {
            return await this.cardRepo.save(cards);
        } catch (err) {
            return { error: err }
        }
    }

    async deleteListCards(listId: number) {
        try {
            return await this.cardRepo.delete({ listId });
        } catch (err) {
            return { error: err }
        }
    }

    async assignMember(memberInfo: MemberInfo) {
        const { userId, workSpaceId, listId, memberName } = memberInfo;
        const existingCard = await this.cardRepo.findOne({ where: { userId, listId, workSpaceId } });
        if (existingCard.memberName) {
            existingCard.memberName = [...existingCard.memberName, memberName]
        } else {
            existingCard.memberName = [memberName];
        }
        await this.cardRepo.update(existingCard.id, existingCard);
        return existingCard
    }
}
