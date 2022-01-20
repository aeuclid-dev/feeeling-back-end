import * as moment from 'moment-timezone';
import { ReturnResult } from './return.result';
import { ErrorCodeToKorMsg } from './errorcode.config';
import * as fs from 'fs';

const imageThumbnail = require('image-thumbnail');

export function getTimeStampUTC() {
  return moment.utc().valueOf();
}
export function getTimeFormatUTC(format) {
  return moment.utc().format(format);
}
export function setTimeStampToFormat(timestamp, format) {
  const getTime = moment.tz('Asia/Seoul').format(format);
  console.log(getTime);
  return getTime;
}

export const usernoToEleven = (user_no: number) => {
  const eleven: number = 11;
  return user_no.toString().length >= eleven
    ? user_no
    : new Array(eleven - user_no.toString().length + 1).join('0') + user_no;
};
/**
 *
 * @param correct_image_id image/corrent/ imagefilename
 * @param type 0:test,1:profile
 * @param typeData add folder or some need data
 * @returns
 */
export const imageFinishWork = async (correct_image_id, type, typeData) => {
  const uploadPath: string = 'images'; //image folder set
  const getFilePath = uploadPath + '/corrent/' + correct_image_id + '.jpg';
  fs.stat(getFilePath, function (err, stat) {
    if (err == null) {
      console.log('File exists');
    } else if (err.code === 'ENOENT') {
      // file does not exist
      console.log('file not exist');
    } else {
      console.log('Some other error: ', err.code);
    }
  });
  let fileNewId;
  if (type === 0) {
    fileNewId =
      usernoToEleven(typeData.test_req_no) +
      '_' +
      setTimeStampToFormat(typeData.test_time, 'yyyyMMDDHHmmss');
  } else if (type === 1) {
    fileNewId =
      usernoToEleven(typeData.testee_no) +
      '_' +
      setTimeStampToFormat(typeData.reg_time, 'yyyyMMDDHHmmss');
  }
  const file_name = fileNewId + '.jpg';

  console.log(file_name);

  let testSaveFolderPath;
  if (type === 0) {
    const testYear = setTimeStampToFormat(typeData.test_time, 'yyyy');
    const testMonth = setTimeStampToFormat(typeData.test_time, 'MM');
    const testDay = setTimeStampToFormat(typeData.test_time, 'DD');
    testSaveFolderPath =
      uploadPath + '/test/' + testYear + '/' + testMonth + '/' + testDay;
  } else if (type === 1) {
    const testYear = setTimeStampToFormat(typeData.reg_time, 'yyyy');
    const testMonth = setTimeStampToFormat(typeData.reg_time, 'MM');
    testSaveFolderPath =
      uploadPath +
      '/profile/' +
      testYear +
      '/' +
      testMonth +
      '/' +
      typeData.testee_no;
  }

  if (!fs.existsSync(testSaveFolderPath)) {
    console.log('folder not exist??');
    fs.mkdirSync(testSaveFolderPath, { recursive: true });
  }

  fs.renameSync(getFilePath, testSaveFolderPath + '/' + file_name);

  const newImageThumbnail = await imageThumbnail(
    testSaveFolderPath + '/' + file_name,
    {
      responseType: 'buffer',
      percentage: 40,
      withMetaData: true,
    },
  );

  fs.writeFileSync(
    testSaveFolderPath + '/' + fileNewId + '_thumb.jpg',
    newImageThumbnail,
  );

  return {
    image_path: testSaveFolderPath,
    image_id: fileNewId,
    image_name: file_name,
  };
};

export const responseToJson: any = (
  code: string,
  data?: object,
  token?: boolean,
) => {
  const result = new ReturnResult();
  result.status = code;
  result.message = ErrorCodeToKorMsg(code);
  if (code === '000') {
    return {
      resultData: data,
      result: result,
    };
  } else {
    return {
      result: result,
    };
  }
};
