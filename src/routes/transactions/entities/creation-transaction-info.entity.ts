import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressInfo } from '@/routes/common/entities/address-info.entity';
import {
  TransactionInfo,
  TransactionInfoType,
} from '@/routes/transactions/entities/transaction-info.entity';

export class CreationTransactionInfo extends TransactionInfo {
  @ApiProperty()
  creator: AddressInfo;
  @ApiProperty()
  transactionHash: string;
  @ApiPropertyOptional({ type: AddressInfo, nullable: true })
  implementation: AddressInfo | null;
  @ApiPropertyOptional({ type: AddressInfo, nullable: true })
  factory: AddressInfo | null;
  @ApiPropertyOptional({ type: String, nullable: true })
  saltNonce: string | null;

  constructor(
    creator: AddressInfo,
    transactionHash: string,
    implementation: AddressInfo | null,
    factory: AddressInfo | null,
    saltNonce: string | null,
  ) {
    super(TransactionInfoType.Creation, null);
    this.creator = creator;
    this.transactionHash = transactionHash;
    this.implementation = implementation;
    this.factory = factory;
    this.saltNonce = saltNonce;
  }
}
