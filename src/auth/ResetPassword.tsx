import React from 'react';
import styled from 'styled-components';
import qs from 'querystring';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { propOr } from 'ramda';
import { Formik, Form as _Form, Field } from 'formik';
import { CbAdmins } from '../api';
import Input from '../shared/components/Input';
import { SubmitButton } from '../shared/components/Buttons';
import NavHeader from '../shared/components/NavHeader/NavHeader';
import { redirectOnError } from '../shared/util/routing';


/**
 * Types
 */
interface LoginProps extends RouteComponentProps {}


/**
 * Styled Components
 */
const Form = styled(_Form)`
  width: 40%;
`;


const ResetPassword: React.SFC<LoginProps> = (props) => (
  <Grid>
    <NavHeader
      centerContent="Reset Password"
      leftContent="Back to login"
      leftTo="/login"
    />
    <Row middle="xs" style={{ height: '60vh' }}>
      <Col xs={12}>
        <Row center="xs">
          <Formik
            initialValues={{ password: '', passwordConfirm: '' }}
            onSubmit={(values) => {
              const query = qs.parse(props.location.search.replace('?', ''));
              const email = typeof query.email === 'string' ? query.email : query.email[0];

              CbAdmins.resetPassword({
                ...values,
                email,
                token: propOr('', 'token', props.match.params),
              })
                .then(() => props.history.push('/login'))
                .catch((err) => redirectOnError(props.history.push, err));
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="password"
                  render={(props: any) =>
                    <Input
                      {...props.fields}
                      type="password"
                      label="Password"
                      error={touched.password && errors.password}
                    />
                  }
                />
                <Field
                  name="passwordConfirm"
                  render={(props: any) =>
                    <Input
                      {...props.fields}
                      type="password"
                      label="Confirm password"
                      error={touched.passwordConfirm && errors.passwordConfirm}
                    />
                  }
                />
                <SubmitButton type="submit">SUBMIT</SubmitButton>
              </Form>
            )}
          </Formik>
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default withRouter(ResetPassword);
