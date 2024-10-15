import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserDocument } from 'src/entities/user.schema';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/shared/guards/gql.guard';
import { RetreiveFileResponseDto } from 'src/models/retreive-file-response.dto';
import { GetCurrentUserFromGql } from 'src/shared/decorators/get-current-user-from-gql.decorator';

@Resolver(() => UserDocument)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [UserDocument])
  @UseGuards(GqlAuthGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(() => UserDocument, { nullable: true })
  async getUserByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => [RetreiveFileResponseDto])
  @UseGuards(GqlAuthGuard)
  async getUserFiles(@GetCurrentUserFromGql('sub') userId: string) {
    const userFiles = await this.userService.retreiveFiles(userId);

    return userFiles;
  }
}
