import { Injectable } from '@nestjs/common';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administradore } from './entities/administradore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministradoresService {
  @InjectRepository(Administradore)
  private AdminRepo: Repository<Administradore>;
  async create(createAdministradoreDto: CreateAdministradoreDto) {
    const newAdmin = this.AdminRepo.create(createAdministradoreDto);
    return await this.AdminRepo.save(newAdmin);
  }

  async findAll() {
    return await this.AdminRepo.find();
  }

  async findOne(id: number) {
    return await this.AdminRepo.findOne({ where: { id } });
  }

  async update(id: number, updateAdministradoreDto: UpdateAdministradoreDto) {
    const admin = await this.AdminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new Error('Administrator not found');
    }
    await this.AdminRepo.update(id, updateAdministradoreDto);
    return await this.AdminRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const admin = await this.AdminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new Error('Administrator not found');
    }
    await this.AdminRepo.remove(admin);
    return `This action removes a #${id} administradore`;
  }

  async validateAdmin(
    correo: string,
    contrasena: string,
  ): Promise<Administradore | null> {
    const admin = await this.AdminRepo.findOne({ where: { correo } });
    if (!admin) return null;

    // Aquí compara contraseñas directamente (en producción usa bcrypt)
    if (admin.contrasena === contrasena) {
      return admin;
    }
    return null;
  }
  async findByCorreo(correo: string): Promise<Administradore | null> {
    return await this.AdminRepo.findOne({ where: { correo } });
  }
}
