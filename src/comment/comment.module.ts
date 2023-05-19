import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entity/comment.entity';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, PhoneEntity, UserEntity])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
