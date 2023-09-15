import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ method, url, data, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      const response = await axios({ method, url, data });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const isValidField = field => {
    const error = errors.find(err => err.field === field);
    return error ? ' is-invalid' : '';
  };

  const getFieldError = field => {
    const error = errors.find(err => err.field === field);
    if (!error) return;
    return <div className='invalid-feedback'>{error.message}</div>;
  };

  const getErrorList = () => {
    const errorList = errors.filter(err => !err.field);
    if (!errorList.length) return null;
    return (
      <div className='alert alert-danger mt-4'>
        <h4>Oooops....</h4>
        <ul className='my-0'>
          {errorList.map(err => (
            <li key={err.message}>{err.message}</li>
          ))}
        </ul>
      </div>
    );
  };

  return { doRequest, getErrorList, getFieldError, isValidField };
};

export default useRequest;
