import { Module } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

/**
 * See optional instruction for global modules https://docs.nestjs.com/modules#global-modules
 */
@Module({
  providers: [<%= classify(name) %>Service],
  exports: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}
