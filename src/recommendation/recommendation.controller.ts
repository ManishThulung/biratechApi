import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { RecommendationService } from './recommendation.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}
  @HasRoles()
  @UseGuards(JwtGuard, RolesGuard)
  @Post('saveQuery')
  async addPhone(@Body() query: any, @Request() req) {
    return this.recommendationService.saveUserQuery(query, req);
  }
}
