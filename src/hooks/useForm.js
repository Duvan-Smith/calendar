import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = [{}]) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState([]);

  const isFormValid = useMemo(() => {
    for (const newFormValidation of formValidation) {
      for (const formValue of Object.keys(newFormValidation)) {
        if (newFormValidation[formValue] !== null) return false;
      }
    }

    return true;
  }, [formValidation]);

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const listFormCheckedValues = [];

    for (const formValidation of formValidations) {
      const formCheckedValues = {};

      for (const formField of Object.keys(formValidation)) {
        const [fn, errorMessage = "Este campo es requerido"] =
          formValidation[formField];

        formCheckedValues[`${formField}Valid`] = fn(formState[formField])
          ? null
          : errorMessage;
      }
      listFormCheckedValues.push(formCheckedValues);
    }

    setformValidation(listFormCheckedValues);
  };

  const onValidate = (key) => {
    for (const newFormValidation of formValidation) {
      if (!newFormValidation[key]) continue;
      return newFormValidation[key];
    }
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    formValidation,
    isFormValid,
    onValidate,
  };
};
