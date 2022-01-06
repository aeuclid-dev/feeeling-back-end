import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from '../repositorys/image.repository';
import { TesteeRepository } from '../repositorys/testee.repository';
import { ErrorCodeToKorMsg } from '../common/errorcode.config';
import * as fs from 'fs';

@Injectable()
export class ImageDownloadService {
  constructor(
    @InjectRepository(ImageRepository)
    private ImageRepository: ImageRepository,
    @InjectRepository(TesteeRepository)
    private TesteeRepository: TesteeRepository,
  ) {}

  /**
   * @param userInfo token을 통해 얻은 userinfo
   * @param fileInfo 요청된 이미지 parameter={type 0/1/2(0:testreq,1:profile,2:resource,3:testeeprofile,4:result image) image_id size 0/1 (0:thumb,1:org)}
   * @param res      요청된 클라이언트의 response객체
   * @returns res file binary data
   */
  async GetImageFile(userInfo, fileInfo, res): Promise<object> {
    console.log('GET ImageFile check!!!');
    switch (fileInfo.type) {
      case 0:
        console.log('type 0 > testRequest image');
        break;
      case 1:
        console.log('type 1 > profile image');
        break;
      case 2:
        console.log('type 2 > resource image');
        break;
      case 3:
        console.log('type 3 > profileTestee image');
        break;
      case 4:
        console.log('type 4 > Result chracter,item image');
        break;
      default:
        console.log('type error!?');
    }

    // console.log(userInfo);
    // console.log(fileInfo);

    //선행되어야할것. 이미지 저장시 처리하는부분... 각각 해당하는 폴더에 저장되는것을 체크하고 확인해야함.
    if (fileInfo.type === 0) {
      try {
        const result_data_testReq = await this.ImageRepository.find({
          image_id: fileInfo.image_id,
        });
        let headerSetObj: any = {};
        if (result_data_testReq) {
          //file exist check//검사 이미지 요청의 경우
          const filePath = 'images/test';
          const fileId = fileInfo.image_id.split('_');
          const resultFilePath =
            filePath +
            '/' +
            fileId[1].substr(0, 4) +
            '/' +
            fileId[1].substr(4, 2) +
            '/' +
            fileId[1].substr(6, 2) +
            '/' +
            (fileInfo.size === 0
              ? fileInfo.image_id + '_thumb.jpg'
              : fileInfo.image_id + '.jpg');
          //console.log(resultFilePath);
          fs.readFile(resultFilePath, (err, data) => {
            if (err) {
              console.log(err);
              headerSetObj = {
                status: '300',
                status_message: ErrorCodeToKorMsg('300'),
              };
              res.set(headerSetObj);
              return res.send();
            } else {
              headerSetObj = {
                'Content-Type': 'image/jpeg',
                status: '000',
                status_message: ErrorCodeToKorMsg('000'),
              };
              res.set(headerSetObj);
              return res.send(data);
            }
          });
        } else {
          let headerSetObj = {
            status: '222',
            status_message: ErrorCodeToKorMsg('222'),
          };
          res.set(headerSetObj);
          return res.send();
        }
      } catch (error) {
        console.log('error!! -->');
        console.log(error);
      }
    } else if (fileInfo.type === 1 || fileInfo.type === 3) {
      //프로필 이미지 요청의 경우
      console.log('in if type 1 and 3 find profile image');
      try {
        const result_data_testee = await this.TesteeRepository.findOne({
          profile_photo: fileInfo.image_id,
        });
        console.log(result_data_testee);
        let headerSetObj: any = {};
        if (result_data_testee) {
          const filePath = 'images/profile';
          const fileId = fileInfo.image_id.split('_');
          const resultFilePath =
            filePath +
            '/' +
            fileId[1].substr(0, 4) +
            '/' +
            fileId[1].substr(4, 2) +
            '/' +
            result_data_testee.testee_no +
            '/' +
            (fileInfo.size === 0
              ? fileInfo.image_id + '_thumb.jpg'
              : fileInfo.image_id + '.jpg');
          //console.log(resultFilePath);
          fs.readFile(resultFilePath, (err, data) => {
            if (err) {
              console.log(err);
              headerSetObj = {
                status: '300',
                status_message: ErrorCodeToKorMsg('300'),
              };
              res.set(headerSetObj);
              return res.send();
            } else {
              headerSetObj = {
                'Content-Type': 'image/jpeg',
                status: '000',
                status_message: ErrorCodeToKorMsg('000'),
              };
              res.set(headerSetObj);
              return res.send(data);
            }
          });
        } else {
          headerSetObj = {
            status: '222',
            status_message: ErrorCodeToKorMsg('222'),
          };
          res.set(headerSetObj);
          return res.send();
        }
      } catch (e) {
        console.log('error!! -->');
        console.log(e);
      }
    } else if (fileInfo.type === 4) {
      //result의 경우에는 size로 이미지인지 아이템인지 판단시킴
      try {
        let headerSetObj: any = {};
        const filePath = 'images/result';
        const fullPath =
          filePath +
          '/' +
          (fileInfo.size === 0 ? 'characters' : 'items') +
          '/' +
          fileInfo.image_id +
          '.png';
        fs.readFile(fullPath, (err, data) => {
          if (err) {
            console.log(err);
            headerSetObj = {
              status: '300',
              status_message: ErrorCodeToKorMsg('300'),
            };
            res.set(headerSetObj);
            return res.send();
          } else {
            headerSetObj = {
              'Content-Type': 'image/jpeg',
              status: '000',
              status_message: ErrorCodeToKorMsg('000'),
            };
            res.set(headerSetObj);
            return res.send(data);
          }
        });
      } catch (e) {
        console.log('error!! -->');
        console.log(e);
      }
    } else if (fileInfo.type === 2) {
      //리소스 이미지 요청의 경우
      let headerSetObj = {
        status: '222',
        status_message: ErrorCodeToKorMsg('222'),
      };
      res.set(headerSetObj);
      return res.send();
    } else {
      // another type
      let headerSetObj = {
        status: '222',
        status_message: ErrorCodeToKorMsg('222'),
      };
      res.set(headerSetObj);
      return res.send();
    }
  }
}
