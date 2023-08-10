import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  getSinglePhoneComments() {
    return this.commentService.getSinglePhoneComments();
  }

  @Get('/phone/:id')
  getCommentsById(@Param('id') id: number) {
    return this.commentService.getCommentsById(id);
  }

  @UseGuards(JwtGuard)
  @Post('/create/:id')
  createComment(
    @Param('id') id: number,
    @Body() value: CommentDto,
    @Req() req,
  ) {
    return this.commentService.createComment(id, value, req.user.userId);
  }
}
