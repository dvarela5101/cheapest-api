import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateTiendaDto {
  @IsString()
  @MaxLength(100)
  codigoInterno: string;

  @IsString()
  @MaxLength(255)
  nombreComercial: string;

  @IsString()
  @MaxLength(255)
  responsableNombre: string;

  @IsUUID()
  paisId: string;

  @IsString()
  @MaxLength(50)
  rut: string;

  @IsString()
  @MaxLength(255)
  direccion: string;

  @IsString()
  @MaxLength(50)
  telefono: string;
}
