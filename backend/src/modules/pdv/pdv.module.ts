import { Module } from '@nestjs/common';
import { PdvService } from './pdv.service';
import { PdvController } from './pdv.controller';
import { PrismaModule } from '../../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PdvController],
  providers: [PdvService],
})
export class PdvModule {}
