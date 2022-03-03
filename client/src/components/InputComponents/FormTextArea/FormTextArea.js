import React from 'react';
import classNames from 'classnames';
import { Field, ErrorMessage } from 'formik';

const FormTextArea = (props) => {
  const { label, classes, type, ...rest } = props;
  return (
    <Field {...rest}>
      {(props) => {
        const { field, meta: { touched, error } } = props;
        const { container, inputStyle, notValid, warning } = classes;
        const textareaClasses = classNames(inputStyle, {
          [notValid]: touched && error,
        });

        return (
          <div className={container}>
            <textarea
              {...field}
              placeholder={label}
              className={textareaClasses}
            />
            <ErrorMessage name={field.name} component="span" className={warning} />
          </div>
        );
      }}
    </Field>
  );
};

export default FormTextArea;
