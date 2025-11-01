/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch, Body, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UpdateUserDto } from '../../presentation/dto/update-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
