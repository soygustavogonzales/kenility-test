import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Name of the client' })
  readonly client_name: string;

  @ApiProperty({ description: 'Total price of the order' })
  readonly total: number;

  @ApiProperty({ description: 'List of product IDs in the order', type: [String] })
  readonly product_list: string[]; // Array of product IDs
}
