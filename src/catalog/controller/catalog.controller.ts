import { Body, Controller, Get, Post, Res } from '@nestjs/common';
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
  addNewCatalog(@Body() dataCatalog: { data: CatalogDto }): Promise<boolean> {
    return this.catalogService.addNewCatalog(dataCatalog.data);
  }

  @Post('edit')
  editCatalog(@Body() dataCatalog: { data: CatalogDto, code: string }): Promise<boolean> {
    return this.catalogService.editCatalog(dataCatalog.data, dataCatalog.code);
  }

  @Post('delete')
  deleteCatalog(@Body() dataCatalog: { code: string }): Promise<boolean> {
    return this.catalogService.deleteCatalog(dataCatalog.code);
  }
}
