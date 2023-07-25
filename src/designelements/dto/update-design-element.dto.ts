import { PartialType } from '@nestjs/mapped-types';
import { CreateDesignElementDto } from './create-design-element.dto';

export class UpdateDesignElementDto extends PartialType(CreateDesignElementDto) {}
