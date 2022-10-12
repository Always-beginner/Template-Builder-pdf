import { TemplateFields } from './model/templateFields.model';
import { AddTemplateDto } from './dto/add-template.dto';
import { Template } from './model/template.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EditTemplateDto } from './dto/edit-template.dto';
import { plainToClass } from 'class-transformer';
import Puppeteer from 'puppeteer';
import { Readable } from 'stream';
import { User } from 'src/user/model/user.model';
import { UserDto } from 'src/user/dto/user-dto';
import Handlebars from 'handlebars';
@Injectable()
export class TemplateService {
  private templateHtml = null;
  private readyHtml = null;

  constructor(
    @InjectModel(Template) private templateModel: typeof Template,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(TemplateFields) private templateFields: typeof TemplateFields,
  ) {}

  async getTemplate() {
    try {
      return await this.templateModel.findAll();
    } catch (error) {
      throw error;
    }
  }
  async getTemplateById(id: number | string) {
    try {
      return await this.templateModel.findOne({ where: { temp_id: id } });
    } catch (error) {
      throw error;
    }
  }
  async getTemplateFields() {
    try {
      return await this.templateFields.findAll();
    } catch (error) {
      throw error;
    }
  }
  async generatePdf(userId: number | string, temp_id: number | string) {
    const getTemplate = await this.templateModel.findOne({
      where: {
        temp_id: temp_id,
      },
    });
    const user1 = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });
    const htmlTemp = `<html lang="en"><head></head><body>${getTemplate.temp_text}</body></html>`;
    let data = {
      user: {
        name: user1.name,
        lastName: user1.lastName,
      },
    };
    let template = Handlebars.compile(htmlTemp);
    this.readyHtml = template(data);
    const browser = await Puppeteer.launch({
      headless: true,
      args: ['--font-render-hinting=medium'],
    });
    const page = await browser.newPage();
    await page.setContent(this.readyHtml, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });
    let pdf = await page.pdf({
      printBackground: true,
      format: 'a4',
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `<div style="border-top: solid 1px #bbb; width: 100%; font-size: 9px;
        padding: 5px 5px 0; color: #bbb; position: relative;">
        <div style="position: absolute; left: 5px; top: 5px;"><span class="date"></span></div>
        <div style="position: absolute; right: 5px; top: 5px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>
    </div>`,
      margin: { top: '70px', right: 10, bottom: '70px', left: 10 },
    });
    browser.close();
    let stream = new Readable();
    stream.push(pdf);
    stream.push(null);
    return stream;
  }
  async addTemplate(addTemplateDto: AddTemplateDto) {
    try {
      return await this.templateModel.create({ ...addTemplateDto });
    } catch (error) {
      throw error;
    }
  }
  async editTemplate(id: number | string, editTemplateDto: EditTemplateDto) {
    try {
      return await this.templateModel.update(
        { ...editTemplateDto },
        { where: { temp_id: id } },
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteTemplate(id: number | string) {
    try {
      return await this.templateModel.destroy({ where: { temp_id: id } });
    } catch (error) {
      throw error;
    }
  }
}
