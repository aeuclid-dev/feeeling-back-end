import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { TbUser } from '../feelingmodel/entities/TbUser';
import {
  getTimeFormatUTC,
  getTimeStampUTC,
  usernoToEleven,
} from '../common/util';

/**
 * image folder structure
 * image(image root folder)
 *    profile
 *        yyyy/mm/userID/ imagefile
 *    resource
 *
 *    test
 *        yyyy/mm/dd/ imagefile
 *
 *    corrent(보정하기위해서 temp처리하는곳)
 *
 * *****image file naming *******
 *  user_no(11-length)_yyyyMMddHHmmss
 *  00000000001_20210325121259
 */

export const reqToObj = (data) => {
  const returnUser = Object.assign({}, data);
  return returnUser;
};

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      console.log('지원하지않는 이미지 형식..');
      //callback(new HttpError(400, '지원하지 않는 이미지 형식입니다.'), false);
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath: string = 'images';
      let withSubFolderPath: string = uploadPath + '/corrent';
      console.log('check folder..');
      // if (request.url === '/test/image/correct') {
      //   withSubFolderPath +=
      //     'test/' +
      //     getTimeFormatUTC('yyyy') +
      //     '/' +
      //     getTimeFormatUTC('MM') +
      //     '/' +
      //     getTimeFormatUTC('DD');
      // } else if (request.url === '/member/new') {
      // } else {
      // }

      if (!existsSync(withSubFolderPath)) {
        console.log('existsSync');
        mkdirSync(withSubFolderPath);
      }

      callback(null, withSubFolderPath);
    },

    filename: (request, file, callback) => {
      let file_name = '';
      console.log('in multer option... filename..');
      console.log(request.url);
      // if (request.url === '/test/image/correct') {
      //   //test correct(이미지 보정요청의 경우에만 _temp처리)
      //   const userData = reqToObj(request.user);
      //   console.log(userData.user_no); //ok
      //   //console.log(request.user.user_no); //err
      //   file_name =
      //     usernoToEleven(userData.user_no) +
      //     '_' +
      //     getTimeFormatUTC('yyyyMMDDHHmmss') +
      //     '_temp.jpg';
      // } else
      if (request.user !== undefined) {
        const getFileFromUser = reqToObj(request.user);

        console.log(getFileFromUser.user_no); //ok
        //console.log(request.user.user_no); //err
        file_name =
          usernoToEleven(getFileFromUser.user_no) +
          '_' +
          getTimeFormatUTC('yyyyMMDDHHmmss') +
          '.jpg';
      } else {
        //join시에만..
        file_name = getTimeStampUTC() + '.jpg';
      }
      console.log('multeroption end..');
      callback(null, file_name);
    },
  }),
};

export const createImageURL = (file): string => {
  // 파일이 저장되는 경로: 서버주소/public 폴더
  // 위의 조건에 따라 파일의 경로를 생성해줍니다.
  console.log(`/images/${file.filename}`);
  return `/images/${file.filename}`;
};
