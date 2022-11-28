import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Card } from 'src/models/card.model';
import { CardService } from './card.service';
import { CardInfo } from './dto/cardInfo.input';
import { DeleteCardArgs } from './dto/deleteCard';
import { GetUserCards } from './dto/getCards.input';
import { MemberInfo } from './dto/member.info';
import { CardsUpdates } from './dto/update';

@Resolver()
export class CardResolver {
    constructor(private readonly cardService: CardService) { }

    @Query(() => [Card])
    async getCards(@Args('GetUserCards') cardUserId: GetUserCards) {
        return await this.cardService.getAllCards(cardUserId);
    }
    @Mutation(() => Card)
    async addCard(@Args('cardInfo') cardInfo: CardInfo) {
        return await this.cardService.addNewCard(cardInfo)

    }

    @Mutation(() => [Card])
    async deleteCard(@Args('cardInfo') cardInfo: DeleteCardArgs) {
        return await this.cardService.deleteCard(cardInfo)
    }

    @Mutation(() => [Card])
    async updateCard(@Args('cardInfo') cardInfo: CardInfo) {
        return await this.cardService.updateCard(cardInfo)
    }

    @Mutation(() => [Card])
    async updateCardsOrder(@Args({ name: 'cards', type: () => [CardsUpdates] }) cards: CardsUpdates[]) {

        return await this.cardService.updateCardsOrder(cards)
    }

    @Mutation(() => Card)
    async assignMember(@Args('memberInfo') memberInfo: MemberInfo) {
        return await this.cardService.assignMember(memberInfo)
    }
}
