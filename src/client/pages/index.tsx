import React, { MouseEventHandler } from 'react';
import axios from 'axios';
import { NextPageContext } from 'next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Head from 'next/head';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';
import { route } from 'next/dist/server/router';
import TemplateProvider from '../components/TemplateProvider';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  subsubmit: {
    margin: theme.spacing(1, 0, 2),
  },
}));
// { name: 'MuiLogin_Component' }

export default function Index(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>feeeling</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{ userid: '', password: '' }}
            validationSchema={Yup.object().shape({
              userid: Yup.string()
                .min(4, '아이디는 최소 4자입니다')
                .required('아이디를 입력해주세요'),
              password: Yup.string()
                .min(6, '비밀번호는 최소 6자입니다')
                .required('비밀번호를 입력해주세요'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log('click submit - formik onsubmit@@@');
              console.log(values);
              setTimeout(async () => {
                let dataToSubmit = {
                  userid: values.userid,
                  password: values.password,
                };
                axios
                  .post(`/admin/login`, dataToSubmit)
                  .then((response) => {
                    const data = response.data;
                    if (
                      data.loginSuccess === true &&
                      data.loginSuccess !== undefined
                    ) {
                      console.log('성공');
                      router.push('/scoring');
                    } else {
                      console.log('실패');
                      setTimeout(() => {
                        closeSnackbar();
                      }, 3000);
                      enqueueSnackbar(data.result.message, {
                        variant: 'error',
                      });
                    }
                  })
                  .catch((e) => {
                    console.log('got error');
                    console.log(e);
                    setTimeout(() => {
                      closeSnackbar();
                    }, 3000);
                    enqueueSnackbar('미등록된 사용자입니다.', {
                      variant: 'error',
                    });
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }, 500);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                setFieldValue,
                handleSubmit,
                handleChange,
                handleBlur,
              } = props;
              return (
                <form
                  onSubmit={(e) => {
                    handleSubmit();
                    e.preventDefault();
                  }}
                  className={classes.form}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userid"
                    label="userid"
                    name="userid"
                    autoComplete="userid"
                    autoFocus
                    placeholder="아이디를 입력해주세요!"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userid}
                    error={errors.userid && touched.userid ? true : false}
                  />
                  <div className="formErrorMessage">
                    {errors.userid && touched.userid && (
                      <div className="input-feedback">{errors.userid}</div>
                    )}
                  </div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="비밀번호를 입력해주세요!"
                    value={values.password}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password ? true : false}
                  />
                  <div className="formErrorMessage">
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    disabled={isSubmitting}
                    className={classes.submit}
                  >
                    로그인
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </>
  );
}
Index.getInitialProps = async function (context: NextPageContext) {
  const { query } = context;
  return { query };
};
