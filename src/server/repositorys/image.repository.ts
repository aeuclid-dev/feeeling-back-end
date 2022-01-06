import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, IsNull, Repository } from 'typeorm';
import { ImageDto } from './dtos/Image.dto';
import { TbImage as image } from '../feelingmodel/entities/TbImage';

@EntityRepository(image)
export class ImageRepository extends Repository<image> {
  async createImage(ImageDto: ImageDto): Promise<image> {
    const { image_id, image_comment, testee_no, reg_time } = ImageDto;
    const result = this.create({
      image_id,
      image_comment,
      testee_no,
      reg_time,
    });
    console.log(result);

    try {
      return await this.save(result);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist sameImage');
      } else {
        console.log('got save error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }

  async updateImage(newValue: object): Promise<void> {
    console.log('in Image repository');
    console.log(newValue);
    try {
      await this.save(newValue);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('image err....');
      } else {
        console.log('got update error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }
}
