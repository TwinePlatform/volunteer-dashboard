import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Formik, Form as _Form, Field } from 'formik';
import { CbAdmins } from '../api';
import Input from '../components/Input';
import { SubmitButton } from '../components/Buttons';
import NavHeader from '../components/NavHeader/NavHeader';
import { redirectOnError } from '../util/routing';


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


const ForgotPassword: React.SFC<LoginProps> = (props) => (
  <Grid>
    <NavHeader
      centerContent="Forgot Password"
      leftContent="Back to login"
      leftTo="/login"
    />
    <Row middle="xs" style={{ height: '60vh' }}>
      <Col xs={12}>
        <Row center="xs">
          <Formik
            initialValues={{ email: '' }}
            onSubmit={(values) => {
              CbAdmins.forgotPassword(values)
                .then(() => props.history.push('/login'))
                .catch((err) => redirectOnError(props.history.push, err));
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="email"
                  render={(props: any) =>
                    <Input
                      {...props.fields}
                      type="email"
                      label="E-mail"
                      error={touched.email && errors.email}
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

export default withRouter(ForgotPassword);
