import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const connectionOption: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: null,
  password: null,
  database: null,
  synchronize: false, //true값을 주면 어플리케이션을 다시 실행할때 엔디디안에서 수정된 컬럼의 길이 타입 변경값등을 해당테이블을 drop한 후 다시 생성함.
  //logging: false,
  entities: [__dirname + '/../**/entities/*.{js,ts}'],
  //entities: ['src/entity/**/*.ts'],
  //migrations: ['src/migration/**/*.ts'],
  //subscribers: ['src/subscriber/**/*.ts'],
  bigNumberStrings: false,
};

export default connectionOption;
