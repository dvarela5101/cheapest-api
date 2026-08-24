import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventarioModule } from './inventario/inventario.module';
import { LogisticaModule } from './logistica/logistica.module';
import { VentasModule } from './ventas/ventas.module';
import { IdentificacionModuleModule } from './identificacion-module/identificacion-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InventarioModule,
    LogisticaModule,
    VentasModule,
    IdentificacionModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
