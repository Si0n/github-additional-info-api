import { Module } from '@nestjs/common';
import { ApiUsersController } from './controller/v1/api.users.controller';
import { ApiUsersService } from './service/v1/api.users.service';

@Module({
  imports: [],
  controllers: [ApiUsersController],
  providers: [ApiUsersService],
})
export class AppModule {}
