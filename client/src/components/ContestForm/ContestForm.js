import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import OptionalSelects from '../OptionalSelects/OptionalSelects';
import Schems from '../../validators/validationSchems';
import CONSTANTS from '../../constants';
import styles from './ContestForm.module.sass';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

const ContestForm = (props) => {
  const { contestType, defaultData, handleSubmit, formRef } = props;
  const { isEditContest } = useSelector(({ contestByIdStore }) => contestByIdStore);
  const { isFetching, error, data } = useSelector(({ dataForContest }) => dataForContest);
  const { getDataForContest, clearDataForContest } = bindActionCreators(actionCreator, useDispatch());

  const initialValues = {
    title: '',
    industry: '',
    focusOfWork: '',
    targetCustomer: '',
    file: '',
    ...variableOptions[contestType],
    ...defaultData(),
  };

  const getPreference = () => {
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        getDataForContest({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        getDataForContest({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        getDataForContest({ characteristic1: 'brandStyle' });
        break;
      }
    }
  };

  useEffect(() => {
    getPreference();
    return () => clearDataForContest();
  }, []);


  const inputClasses = {
    container: styles.componentInputContainer,
    input: styles.input,
    warning: styles.warning,
  };
  const textAreaClasses = {
    container: styles.componentInputContainer,
    inputStyle: styles.textArea,
    warning: styles.warning,
  };
  const selectClasses = {
    inputContainer: styles.selectInputContainer,
    inputHeader: styles.selectHeader,
    selectInput: styles.select,
    warning: styles.warning,
  };
  const fileUploadClasses = {
    fileUploadContainer: styles.fileUploadContainer,
    labelClass: styles.label,
    fileNameClass: styles.fileName,
    fileInput: styles.fileInput,
    warning: styles.warning,
  };

  return (
    <>
      {error && <TryAgain getData={getPreference} />}
      {isFetching && <Spinner />}
      {data && <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Schems.ContestSchem}
          innerRef={formRef}
          enableReinitialize
        >
          <Form>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Title of contest</span>
              <FormInput
                name="title"
                type="text"
                label="Title"
                classes={inputClasses}
              />
            </div>
            <div className={styles.inputContainer}>
              <SelectInput
                name="industry"
                classes={selectClasses}
                header="Describe industry associated with your venture"
                optionsArray={data.industry}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What does your company / business do?
              </span>
              <FormTextArea
                name="focusOfWork"
                type="text"
                label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                classes={textAreaClasses}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                Tell us about your customers
              </span>
              <FormTextArea
                name="targetCustomer"
                type="text"
                label="customers"
                classes={textAreaClasses}
              />
            </div>
            <OptionalSelects contestType={contestType} data={data} />
            <FieldFileInput
              name="file"
              classes={fileUploadClasses}
              type="file"
            />
            {isEditContest ? <button type="submit" className={styles.changeData}>Set Data</button> : null}
          </Form>
        </Formik>
      </div>}
    </>
  );
};

export default withRouter(ContestForm);
