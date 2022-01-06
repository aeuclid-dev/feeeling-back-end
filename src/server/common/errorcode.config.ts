// 000	ok	요청이 정상 처리 됨
// //데이터 처리 관련
// 100	파라미터의 구성 요소의 일부가 누락되었거나 규격에 맞지 않습니다.
// 200	이미 서비스에 가입된 회원입니다.	회원 중복
// 201	이미 카카오에 의해 서비스에 가입된 회원입니다.	카카오에 가입되어있는데 일반 회원으로 가입 시도한 경우
// 202	이미 네이버에 의해 서비스에 가입된 회원입니다.	네이버에 가입되어있는데 일반 회원으로 가입 시도한 경우
// 210	토큰이 필요합니다.
// 220	로그인에 실패하였습니다.	로그인시 이디가 틀리거나 암호가 틀린 경우
// 221	존재하지 않은 회원입니다.
// 222	데이터가 없습니다.
// 223	이미 등록된 피검사자(그린이) 입니다.
// 300	이미지 파일이 존재하지 않습니다.
// 301	이미지 파일이 아닙니다.

export const ErrorCodeToKorMsg = (code) => {
  let resultMsg = '';
  switch (code.toString()) {
    case '000':
      resultMsg = 'ok';
      break;
    case '100':
      resultMsg =
        '파라미터의 구성 요소의 일부가 누락되었거나 규격에 맞지 않습니다.';
      break;
    case '200':
      resultMsg = '이미 서비스에 가입된 회원입니다.';
      break;
    case '201':
      resultMsg = '이미 카카오에 의해 서비스에 가입된 회원입니다.';
      break;
    case '202':
      resultMsg = '이미 네이버에 의해 서비스에 가입된 회원입니다.';
      break;
    case '210':
      resultMsg = '토큰이 필요합니다.';
      break;
    case '220':
      resultMsg = '로그인에 실패하였습니다.';
      break;
    case '221':
      resultMsg = '존재하지 않은 회원입니다.';
      break;
    case '222':
      resultMsg = '데이터가 없습니다.';
      break;
    case '223':
      resultMsg = '이미 등록된 피검사자(그린이) 입니다.';
      break;
    case '300':
      resultMsg = '이미지 파일이 존재하지 않습니다.';
      break;
    case '301':
      resultMsg = '이미지 파일이 아닙니다.';
      break;
    default:
      resultMsg = code;
  }
  return resultMsg;
};
