import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatalogService } from '../service/catalog.service';
import { CatalogDto } from '../dto/catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {
  }

  @Get()
  getAllCatalog(): Promise<CatalogDto[]> {
    return this.catalogService.getAllCatalog();
  }

  @Post('new')
  addNewCatalog(@Body() dataCatalog: CatalogDto): Promise<boolean> {
    console.log(dataCatalog);
    return this.catalogService.addNewCatalog(dataCatalog);
  }
}
