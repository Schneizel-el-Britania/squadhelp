import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as actionCreator from '../../actions/actionCreator';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';
import CONTANTS from '../../constants';
import styles from './OfferForm.module.sass';

const initialValues = {
  offerData: '',
};

const OfferForm = (props) => {
  const { contestId, contestType, customerId } = props;
  const { addOfferError } = useSelector(({ contestByIdStore }) => contestByIdStore);
  const { setOffer, clearAddOfferError } = bindActionCreators(actionCreator, useDispatch());

  const renderOfferInput = () => {
    if (props.contestType === CONTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOfferHandle = (values, { resetForm }) => {
    clearAddOfferError();
    const data = new FormData();
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    setOffer(data);
    resetForm();
  };

  const validationSchema = (contestType === CONTANTS.LOGO_CONTEST) ? Schems.LogoOfferSchema : Schems.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && <Error data={addOfferError.data} status={addOfferError.status} clearError={clearAddOfferError} />}
      <Formik
        onSubmit={setOfferHandle}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >{(formik) => {
        const { touched, isValid } = formik;
        return (
          <Form className={styles.form}>
            {renderOfferInput()}
            {touched.offerData && isValid && <button type="submit" className={styles.btnOffer}>Send Offer</button>}
          </Form>);
      }}</Formik>
    </div>
  );
};

export default OfferForm;
