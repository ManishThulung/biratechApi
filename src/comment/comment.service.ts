import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entity/comment.entity';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getSinglePhoneComments() {
    return this.commentRepository.find({ relations: ['author'] });
  }

  async createComment(phoneId: number, value: CommentDto, userId: number) {
    const phone = await this.phoneRepository.findOne({
      where: {
        id: phoneId,
      },
    });
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const comment = new CommentEntity();
    comment.comment = value.value;
    comment.phone = phone;
    comment.author = user;

    await this.commentRepository.save(comment);
    return { message: 'Comment successfull' };
  }
}
