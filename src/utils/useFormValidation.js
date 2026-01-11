// Auto-generated validation hook from BRD
// Generated: 2026-01-11T08:46:45.306Z

import { useState } from 'react';
import validations from './validations';

export const useFormValidation = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (field, value) => {
        setValues(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        
        // Validate field on blur
        const fieldValidation = validations.getFieldValidation(field);
        if (fieldValidation) {
            const result = validations.validateFormData({ [field]: values[field] });
            if (!result.valid) {
                setErrors(prev => ({ ...prev, ...result.errors }));
            }
        }
    };

    const validate = () => {
        const result = validations.validateFormData(values);
        setErrors(result.errors);
        return result.valid;
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validate,
        reset,
        setValues,
        setErrors
    };
};

export default useFormValidation;
