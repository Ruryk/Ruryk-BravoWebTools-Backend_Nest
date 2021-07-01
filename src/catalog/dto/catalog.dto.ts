import { UnitsDto } from './units.dto';

export class CatalogDto {
  code: string;
  name: string;
  units: UnitsDto[];
  availability: string;
  actions: string;
  exclusively: string[];
  replacementProducts: string[];
}
