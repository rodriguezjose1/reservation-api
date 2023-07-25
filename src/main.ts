import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurar títulos de documentación
    const options = new DocumentBuilder().setTitle('REST API').setDescription('API REST').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, options);

    // La ruta en que se sirve la documentación
    SwaggerModule.setup('docs', app, document);

    app.use((req, res, next) => {
        res.locals.initTime = Date.now();
        next();
    });

    await app.listen(process.env.PORT);
    console.log('API listening in port: ', process.env.PORT);
}
bootstrap();
