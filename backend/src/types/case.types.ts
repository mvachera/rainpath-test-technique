import { IsString, IsArray, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

const VALID_COLORATIONS = ['HES', 'PAS', 'IHC', 'TRICHROME', 'ALCIAN_BLUE', 'CONGO_RED', 'MASSON', 'GIEMSA', 'PAS_D'];

export class CreateLameDto {
  @IsString()
  @IsIn(VALID_COLORATIONS, { message: 'Coloration invalide. Valeurs acceptées: HES, PAS, IHC, TRICHROME, ALCIAN_BLUE, CONGO_RED, MASSON, GIEMSA, PAS_D' })
  coloration: string;
}

export class CreateBlocDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLameDto)
  lames: CreateLameDto[];
}

export class CreatePrelevementDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlocDto)
  blocs: CreateBlocDto[];
}

export class CreateCaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrelevementDto)
  prelevements: CreatePrelevementDto[];
}

export interface Lame {
  id: number;
  coloration: string;
}

export interface Bloc {
  id: number;
  lames: Lame[];
}

export interface Prelevement {
  id: number;
  blocs: Bloc[];
}

export interface Case {
  id: number;
  prelevements: Prelevement[];
}