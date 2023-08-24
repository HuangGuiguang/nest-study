import { Controller, SetMetadata, applyDecorators } from '@nestjs/common';

export const AppControlDecorator = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};
