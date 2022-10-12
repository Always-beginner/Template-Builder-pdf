import { EditTemplateDto } from './dto/edit-template.dto';
import { AddTemplateDto } from './dto/add-template.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Response } from 'express';

@Controller('template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Get('/getTemplates')
  getTemplates() {
    return this.templateService.getTemplate();
  }
  @Get('/Template/:id')
  getTemplateById(@Param() params) {
    return this.templateService.getTemplateById(params.id);
  }
  @Get('/getTemplateFields')
  getTemplateFields() {
    return this.templateService.getTemplateFields();
  }
  @Get('download-pdf/:userId/:temp_id')
  async generatePdf(@Param() params, @Res() res: Response) {
    try {
      let pdfStream = await this.templateService.generatePdf(
        params.userId,
        params.temp_id,
      );
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=proposal-${params.id}.pdf`,
      });
      pdfStream.pipe(res);
      return pdfStream;
    } catch (error) {
      throw error;
    }
  }
  @Post('/addTemplate')
  addTemplate(@Body() addTemplateDto: AddTemplateDto) {
    return this.templateService.addTemplate(addTemplateDto);
  }
  @Patch('/editTemplate/:id')
  editTemplate(@Param() params, @Body() editTemplateDto: EditTemplateDto) {
    return this.templateService.editTemplate(params.id, editTemplateDto);
  }
  @Delete('/deleteTemplate/:id')
  deleteTemplate(@Param() params) {
    return this.templateService.deleteTemplate(params.id);
  }
}
