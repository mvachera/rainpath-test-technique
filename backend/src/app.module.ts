import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasesModule } from './cases/cases.module';

@Module({
  imports: [CasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
