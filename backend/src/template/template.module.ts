import { TemplateFields } from './model/templateFields.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TemplateController } from './template.controller';
import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from './model/template.model';
import { User } from 'src/user/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Template, User, TemplateFields])],
  providers: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
