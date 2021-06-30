import { UnitsDto } from './units.dto';

export class CatalogDto {
  _id: string;
  code: string;
  name: string;
  units: UnitsDto[];
  availability: string;
  actions: string;
  exclusively: string[];
  replacementProducts: string[];
}
