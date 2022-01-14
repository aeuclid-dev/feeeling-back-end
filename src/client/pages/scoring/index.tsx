import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPageContext } from 'next';
import axios from 'axios';

import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  CssBaseline,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Questions from './Questions';
import TemplateProvider from '../../components/TemplateProvider';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'space-around',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBarBtnDiv: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleBarContents: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  content: {
    //flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: 0,
    marginRight: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  mr1: {
    marginRight: theme.spacing(1),
  },

  username: {
    marginRight: theme.spacing(4),
  },

  textField: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 130,
  },
  cssLabel: {
    color: 'white',
  },
  cssOutlinedInput: {
    padding: 0,
    marginLeft: 5,
    marginRight: 5,
    '& .Mui-disabled': {
      color: 'white', // (default alpha is 0.38)
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: 5,
      paddingBottom: 5,
    },
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
      '& .Mui-disabled': {
        color: 'white', // (default alpha is 0.38)
      },
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  // end toolbars..
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paperContents1: {
    flex: 2,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paperContents2: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  bottomContents: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  bottomTextAreaContents: {
    backgroundColor: '#fff',
  },
  underLineText: {
    textDecoration: 'underline',
  },
  rightQuestionPannel: {
    maxHeight: 550,
    overflowY: 'auto',
  },
  rightQuestionBottomScoreDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightQuestionBottomScoreContents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 3,
    paddingLeft: 3,
    paddingBottom: 3,
  },
}));

interface checkScoreDataType {
  lang: string;
  psy_check_id: number;
  psy_check_score_id: number;
  score: number;
  score_desc: string;
  score_item: string;
  score_seq: number;
}

interface questionScoreDataType {
  categoryId: string;
  checkScore: Array<checkScoreDataType>;
  check_category: string;
  check_desc: string;
  check_item: string;
  check_seq: number;
  lang: string;
  psy_check_id: number;
  test_id: number;
  user_YN: string;
  checkScoreSelect?: number;
}
interface requestTestType {
  birthday: string;
  gender: number;
  image_id: string;
  image_no: number;
  nickname: string;
  profile_photo: string;
  reg_time: number;
  status: number;
  test_category: string;
  test_desc: string;
  test_end_date: string;
  test_id: number;
  test_name: string;
  test_req_no: number;
  test_start_date: string;
  test_time: number;
  test_type: string;
  testee_no: number;
  type: number;
  use_yn: string;
  user_no: number;
}

export default function Index(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  /***********Material ui style[S]*********************************** */
  const classes = useStyles();
  /***********Material ui style[E]*********************************** */
  const [watingRequest, setWatingRequest] = useState(0);
  const [correntMonth, setCorrentMonth] = useState(0);
  const [today, setToday] = useState(0);
  const [adminName, setAdminName] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);
  const [isQuestionLoaded, setIsQuestionLoaded] = useState(false);

  const [requestData, setRequestData] = useState<any | object>({});
  const [questionCategory, setQuestionCategory] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [questionScoreByCategory, setQuestionScoreByCategory] = useState({});
  const [testRequestImage, setTestRequestImage] = useState('');
  const [PsychologicalStatusText, setPsychologicalStatusText] = useState('');
  const [Recommend, setRecommend] = useState('');

  const [notVaildateQuestions, setNotVaildateQuestions] = useState<
    Array<number>
  >([]);

  const [tabValue, setTabValue] = useState(1);

  //reject or Done 이후 페이지 리셋부.
  const pageDataReset = () => {
    //페이지에 존재하는 모든 state 초기화
    setIsLoaded(false);
    setIsQuestionLoaded(false);
    setRequestData({});
    setQuestionCategory([]);
    setQuestionData([]);
    setQuestionScoreByCategory({});
    setTestRequestImage('');
    setNotVaildateQuestions([]);
    setTabValue(1);
  };

  //new btn 클릭후 데이터 초기 가져와서 page에 맞게 데이터 구성처리.
  const createQuestionData = (questionData, categoryArr) => {
    const setquestionCategoryId = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
    ]; //max 10??
    let categoryScore = {};
    categoryArr.map((data, index) => {
      let newObj = {
        categoryName: data,
        categoryId: setquestionCategoryId[index],
        checkedScore: 0,
        testerAdjust: 0,
        finalScore: 0,
      };
      categoryScore[setquestionCategoryId[index]] = newObj;
      questionData = questionData.map((item, i) => {
        if (item.check_category === data) {
          return {
            ...item,
            categoryId: setquestionCategoryId[index],
          };
        } else {
          return item;
        }
      });
    });
    console.log(categoryScore);
    const newQuestionData: Array<questionScoreDataType> = questionData;
    setQuestionScoreByCategory(categoryScore);
    setQuestionData(newQuestionData);
    setQuestionCategory(categoryArr);
  };

  //우측 중단 Tester Adjust 입력이벤트
  const handleTesterAdjustChange = (e) => {
    const regex = /^(-?)[0-5]{0,1}$/;
    if (regex.test(e.target.value)) {
      console.log(e.target.name);
      console.log(e.target.value);
      if (e.target.value !== '-') {
        let newQSBC = Object.assign({}, questionScoreByCategory);
        //score calc
        newQSBC[e.target.name].testerAdjust = e.target.value;
        newQSBC[e.target.name].finalScore =
          parseInt(newQSBC[e.target.name].checkedScore) +
          parseInt(e.target.value);
        setQuestionScoreByCategory(newQSBC);
      }
    } else {
      return false;
    }
  };

  //우측 라디오버튼 클릭 이벤트
  const handleScoreSelected = (psy_check_id, psy_check_score_id) => {
    let selectedCategory = '';

    let newArr = questionData.map((item, i) => {
      if (item.psy_check_id === psy_check_id) {
        selectedCategory = item.categoryId;
        return {
          ...item,
          checkScoreSelect: psy_check_score_id,
        };
      } else {
        return item;
      }
    });

    let score = 0;
    newArr.map((data) => {
      if (
        data['checkScoreSelect'] !== undefined &&
        data.categoryId === selectedCategory
      ) {
        data.checkScore.map((scoreData) => {
          if (scoreData.psy_check_score_id === data.checkScoreSelect) {
            score = score + scoreData.score;
          }
        });
      }
    });
    console.log(selectedCategory);
    console.log(score);

    setQuestionData(newArr);
    let newQSBC = Object.assign({}, questionScoreByCategory);
    //score calc
    newQSBC[selectedCategory].checkedScore = score;

    newQSBC[selectedCategory].finalScore =
      score + parseInt(newQSBC[selectedCategory].testerAdjust);
    setQuestionScoreByCategory(newQSBC);
  };

  //우측 카테고리 선택 이벤트
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //NEW 버튼 클릭시 이미지 데이터 받는 function
  const getTestRequestImageFile = (image_id) => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        type: 0,
        image_id: image_id,
        size: 1,
      },
      responseType: 'arraybuffer' as 'text',
      responseEncoding: 'binary',
    };
    axios
      .get(`/image/adminScroingImage`, axiosConfig)
      .then(async (response) => {
        console.log('got a response for image!!');
        let imageblob = await Buffer.from(response.data, 'binary').toString(
          'base64',
        );
        setTestRequestImage(imageblob);
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });
  };

  //NEW 버튼 클릭시 질문 데이터 받는 function
  const getQuestions = (test_id) => {
    console.log('call getQuestions');
    let axiosConfig = {
      params: {
        test_id: test_id,
      },
    };
    axios
      .get(`/scoring/requestQuestion`, axiosConfig)
      .then((response) => {
        setIsQuestionLoaded(true);
        createQuestionData(response.data.data, response.data.categoryData);
        setTabValue(1);
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });
  };

  //상단 NEW 버튼 클릭 이벤트
  const getRequest = () => {
    console.log('click new Btn');
    axios
      .get(`/scoring/requestTest`)
      .then((response) => {
        console.log('###########################################');
        console.log(response);
        console.log('###########################################');
        if (response.data.data !== null) {
          setIsLoaded(true);
          const reqData: requestTestType = response.data.data;
          setRequestData(reqData);
          setInitalData();
          getQuestions(reqData.test_id);
          getTestRequestImageFile(response.data.data.image_id);
        } else {
          setTimeout(() => {
            closeSnackbar();
          }, 3000);
          enqueueSnackbar('요청된 테스트가 없습니다..', {
            variant: 'error',
          });
        }
      })
      .catch((e) => {
        console.log('got error');
        console.log(e);
      })
      .finally(() => {
        console.log('axios fin');
      });
    console.log('new btn axios end....');
  };

  //상단 우측 reject 버튼 처리 액션
  const setReject = () => {
    if (
      JSON.stringify({}) !== JSON.stringify(requestData) &&
      requestData.test_req_no !== undefined
    ) {
      axios.post(`/scoring/rejectTestReq`, requestData).then((response) => {
        console.log('rejectTestReq Response');
        console.log(response.data);
        pageDataReset(); //reset data;
        setInitalData();
      });
    } else {
      console.log('not loaded data');
    }
  };

  //상단 최우측 done 클릭시 버튼액션
  const handleClickDone = () => {
    console.log('click done');
    console.log(requestData);
    if (
      JSON.stringify({}) !== JSON.stringify(requestData) &&
      requestData.test_req_no !== undefined
    ) {
      let checkAllcheckScoreSelectExist = 0;
      let maybeAllcheckScoreSelectLength = questionData.length;
      console.log(
        checkAllcheckScoreSelectExist,
        maybeAllcheckScoreSelectLength,
      );
      let checkQuestionIdArr = [];
      questionData.map((question, index) => {
        if (question['checkScoreSelect'] === undefined) {
          checkQuestionIdArr.push(question.psy_check_id);
        } else if (
          question['checkScoreSelect'] !== undefined &&
          question['checkScoreSelect'] !== null
        ) {
          checkAllcheckScoreSelectExist++;
        } else {
          console.log('error-checkvalidate!!');
        }
      });

      setNotVaildateQuestions(checkQuestionIdArr);
      console.log(
        checkAllcheckScoreSelectExist,
        maybeAllcheckScoreSelectLength,
      );

      let senddata = {
        testRequestInfo: requestData,
        questionData: questionData,
        questionScoreByCategory: questionScoreByCategory,
        PsychologicalStatusText: PsychologicalStatusText,
        Recommend: Recommend,
      };
      if (checkAllcheckScoreSelectExist === maybeAllcheckScoreSelectLength) {
        axios
          .post('/scoring/finish', senddata)
          .then((response) => {
            console.log('got response!!! done is finished....!');
            console.log(response);
            console.log(response.data);
            if (!response.data.send_push) {
              setTimeout(() => {
                closeSnackbar();
              }, 3000);
              enqueueSnackbar(
                '푸시토큰이 만료되어 푸시알람 발송에 실패했습니다.',
                {
                  variant: 'error',
                },
              );
            }

            if (response.data.is_success) {
              pageDataReset(); //reset data;
              setInitalData();
            }
          })
          .catch((e) => {
            console.log('got error');
            console.log(e);
          })
          .finally(() => {
            console.log('axios fin');
          });
      } else {
        setTimeout(() => {
          closeSnackbar();
        }, 3000);
        enqueueSnackbar(
          `답변하지않은 질문이 ${
            maybeAllcheckScoreSelectLength - checkAllcheckScoreSelectExist
          }개 있습니다. 정확하게 처리해주세요!`,
          {
            variant: 'error',
          },
        );
        console.log('nonono need more data');
        return false;
      }
    } else {
      console.log('not loaded data');
    }
  };

  //초기 데이터 로드, 버튼 액션 이후 데이터 처리
  const setInitalData = () => {
    let date = new Date();
    const sendData = {
      params: {
        date: date.valueOf(),
      },
    };
    axios
      .get(`/scoring/scoringInitdata`, sendData)
      .then((response) => {
        console.log('scoringInitdata');
        console.log('###############################################');
        console.log(response);
        console.log('###############################################');
        console.log(response.data);
        console.log('###############################################');
        setAdminName(response.data.user_name);
        setWatingRequest(response.data.watingRequest);
        setCorrentMonth(response.data.correntMonth);
        setToday(response.data.today);
      })
      .catch((error) => {
        console.log('scoringInitdata error');
        console.log('error ----- ');
        console.log(error);
      });
  };

  useEffect(() => {
    setInitalData();
    console.log('check initdata');
  }, []);

  return (
    <>
      <Head>
        <title>feeelingScoringTestRequestPage</title>
      </Head>

      <AppBar>
        <Toolbar variant="dense" className={classes.toolbar}>
          <div className={classes.title}>
            <Typography
              component="div"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.mr1}
            >
              Aeuclid Logo
            </Typography>
            <Avatar className={classes.mr1}></Avatar>
            <div className={classes.username}>
              <Typography
                className={classes.title}
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
              >
                {adminName}
              </Typography>
            </div>
            <div className={classes.titleBarContents}>
              <Typography
                className={classes.title}
                variant="subtitle2"
                color="inherit"
              >
                Current Month
              </Typography>
              <TextField
                disabled
                className={classes.textField}
                id="filled-correntMonth"
                //label="Current Month"
                variant="outlined"
                value={correntMonth}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  readOnly: true,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </div>
            <div className={classes.titleBarContents}>
              <Typography
                className={classes.title}
                variant="subtitle2"
                color="inherit"
              >
                Today
              </Typography>
              <TextField
                disabled
                id="filled-today"
                //label="Today"
                variant="outlined"
                value={today}
                className={classes.textField}
                // InputLabelProps={{
                //   classes: {
                //     root: classes.cssLabel,
                //     focused: classes.cssFocused,
                //   },
                // }}
                InputProps={{
                  readOnly: true,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </div>
            <div className={classes.titleBarContents}>
              <TextField
                disabled
                id="filled-watingRequest"
                //label="watingRequest"
                variant="outlined"
                value={watingRequest}
                className={classes.textField}
                // InputLabelProps={{
                //   classes: {
                //     root: classes.cssLabel,
                //     focused: classes.cssFocused,
                //   },
                // }}
                InputProps={{
                  readOnly: true,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Button
                type="button"
                variant="contained"
                color="secondary"
                disabled={isLoaded}
                onClick={getRequest}
              >
                New
              </Button>
            </div>
          </div>
          <div className={classes.titleBarBtnDiv}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              disabled={!isLoaded}
              onClick={setReject}
            >
              Reject
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              disabled={!isLoaded}
              onClick={handleClickDone}
            >
              Done
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {isLoaded ? (
          <Container maxWidth={true} className={classes.container}>
            <div className={classes.mainContainer}>
              <Paper elevation={3} className={classes.paperContents1}>
                {testRequestImage !== '' ? (
                  <img
                    style={{ maxWidth: 800 }}
                    src={'data:image/png;base64, ' + testRequestImage}
                    alt="testimage"
                    onLoad={(e) => {
                      console.log('onloaded!');
                    }}
                  />
                ) : (
                  <pre>
                    <code>{JSON.stringify(requestData, null, 4)}</code>
                  </pre>
                )}
              </Paper>
              <Paper elevation={3} className={classes.paperContents2}>
                {isQuestionLoaded ? (
                  <TabContext value={`${tabValue}`}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange}>
                        {questionCategory.map((data, index) => {
                          return (
                            <Tab
                              key={index}
                              label={data}
                              value={`${index + 1}`}
                            />
                          );
                        })}
                      </TabList>
                    </Box>
                    {Object.entries(questionScoreByCategory).map(
                      (objectArr, index) => {
                        const data: any = objectArr[1]; //0:key 1:object
                        return (
                          <TabPanel
                            key={index}
                            value={`${index + 1}`}
                            className={classes.rightQuestionPannel}
                          >
                            {questionData
                              .filter(
                                (questionDataObj) =>
                                  questionDataObj.categoryId ===
                                  data.categoryId,
                              )
                              .map(
                                (
                                  sameCategoryData: questionScoreDataType,
                                  scdindex,
                                ) => {
                                  return (
                                    <Questions
                                      key={data.categoryId + '' + scdindex}
                                      data={sameCategoryData}
                                      onClick={handleScoreSelected}
                                      validata={notVaildateQuestions}
                                    />
                                  );
                                },
                              )}
                            <div
                              className={classes.rightQuestionBottomScoreDiv}
                            >
                              <div
                                className={
                                  classes.rightQuestionBottomScoreContents
                                }
                              >
                                <span>Checked Score</span>
                                <TextField
                                  id={data.categoryId + 'CheckedScore'}
                                  variant="outlined"
                                  size="small"
                                  value={data.checkedScore}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                              <div
                                className={
                                  classes.rightQuestionBottomScoreContents
                                }
                              >
                                <span>Tester Adjust</span>
                                <TextField
                                  id={data.categoryId + 'TesterAdjust'}
                                  variant="outlined"
                                  size="small"
                                  value={data.testerAdjust}
                                  name={data.categoryId}
                                  onChange={handleTesterAdjustChange}
                                />
                              </div>
                              <div
                                className={
                                  classes.rightQuestionBottomScoreContents
                                }
                              >
                                <span>Final Score</span>
                                <TextField
                                  id={data.categoryId + 'FinalScore'}
                                  variant="outlined"
                                  size="small"
                                  value={data.finalScore}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                            </div>
                          </TabPanel>
                        );
                      },
                    )}
                  </TabContext>
                ) : (
                  <span>질문이 없습니다. 관리자에게 문의해주세요 </span>
                )}
              </Paper>
            </div>
            <div className={classes.mainContainer}>
              <div className={classes.bottomContents}>
                <span className={classes.underLineText}>
                  Psychological Status
                </span>
                <TextField
                  id="outlined-multiline-static"
                  //label="Multiline"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  inputProps={{
                    style: { backgroundColor: '#FFF' },
                  }}
                  InputProps={{
                    className: classes.bottomTextAreaContents,
                  }}
                  value={PsychologicalStatusText}
                  onChange={(e) => {
                    setPsychologicalStatusText(e.target.value);
                  }}
                />
              </div>
              <div className={classes.bottomContents}>
                <span className={classes.underLineText}>Recommend</span>
                <TextField
                  id="outlined-multiline-static2"
                  //label="Multiline"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  inputProps={{
                    style: { backgroundColor: '#FFF' },
                  }}
                  InputProps={{
                    className: classes.bottomTextAreaContents,
                  }}
                  value={Recommend}
                  onChange={(e) => {
                    setRecommend(e.target.value);
                  }}
                />
              </div>
            </div>
          </Container>
        ) : null}
      </main>
    </>
  );
}
Index.getInitialProps = async function (context: NextPageContext) {
  const { query } = context;
  return { query };
};
