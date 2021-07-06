import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileErrorsDto } from '../dto/fileErrorsDto';
import { CsvCheckService } from '../service/csv-check.service';

import { diskStorage } from 'multer';
import { extname } from 'path';

const path =
  __dirname.split('\\').slice(0, -1).join('\\') + '\\service\\uploads';

export const storage = diskStorage({
  destination: path,
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return 'check' + extname(file.originalname);
}

@Controller('csv')
export class CsvCheckController {
  constructor(private csvService: CsvCheckService) {}

  @Post('check')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async checkCsv(@UploadedFile() file: any): Promise<any> {
    const readFile = await this.csvService.parse(file);
    return readFile;
  }
}
