import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdeDto } from './create-order.dto';

export class UpdateOrdeDto extends PartialType(CreateOrdeDto) {}
