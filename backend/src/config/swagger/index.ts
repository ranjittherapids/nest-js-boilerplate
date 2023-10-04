import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readFile, copyFile } from 'fs/promises';
import { Swagger } from '@src/common';

const options = new DocumentBuilder()
  .setTitle(Swagger.title)
  .setDescription(Swagger.description)
  .setVersion(Swagger.version)
  .build();

export const SetupSwagger = async (app: INestApplication): Promise<void> => {
  await copyFile(Swagger.tsCssPath, Swagger.jsCssPath);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(Swagger.url, app, document, {
    customCss: await readFile(Swagger.jsCssPath, 'utf-8'),
  });
};
