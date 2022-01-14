import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNoteRepository } from '../repositorys/appNote.repository';
import { PublicPostingRepository } from '../repositorys/publicPosting.repository';
import { NoticeRepository } from '../repositorys/notice.repository';
import { responseToJson } from './util';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(AppNoteRepository)
    private appnoterepository: AppNoteRepository,
    @InjectRepository(PublicPostingRepository)
    private publicpostingrepository: PublicPostingRepository,
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
  ) {}

  async GetAppLabel(usage): Promise<object> {
    console.log('get request text type -> ', usage);
    try {
      const getText = await this.appnoterepository.find({
        app_note_usage: usage,
        user_yn: 'Y',
      });
      const resultToJson = JSON.parse(JSON.stringify(getText));
      let resultText = '';
      if (resultToJson.length > 1) {
        if (getText.length > 1) {
          const random = Math.floor(Math.random() * getText.length);
          resultText = resultToJson[random].app_note;
        } else {
          resultText = resultToJson[0].app_note;
        }
        return responseToJson('000', resultText);
      } else {
        resultText = resultToJson[0].app_note;
        return responseToJson('000', resultText);
      }
    } catch (error) {
      console.log('error!! -->');
      console.log(error);
      return responseToJson('100');
    }
  }

  async GetAppNotice(object) {
    try {
      const notice = await this.publicpostingrepository.find({
        skip: object.pos,
        take: object.count,
        order: {
          posting_no: 'DESC',
        },
      });
      if (notice.length > 0) {
        return responseToJson('000', notice);
      } else {
        return responseToJson('222', notice);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async GetAlarm(user, object) {
    console.log('alarm - user');
    console.log(object);
    try {
      const alarm = await this.noticeRepository.find({
        relations: [
          'testRequest',
          'testRequest.linkimage',
          'testRequest.testeeinfo',
          'testRequest.linktestname',
        ],
        where: {
          user_no: user.user_no,
        },
        skip: object.pos,
        take: object.count,
        order: {
          notice_no: 'DESC',
        },
      });
      if (alarm.length > 0) {
        return responseToJson('000', alarm);
      } else {
        return responseToJson('222', alarm);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
