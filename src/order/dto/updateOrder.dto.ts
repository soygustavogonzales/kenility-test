export class UpdateOrderDto {
  readonly client_name?: string;
  readonly total?: number;
  readonly product_list?: string[]; // Array of product IDs
}
