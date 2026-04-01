/* eslint-disable @typescript-eslint/no-explicit-any */
export const getFieldError = (fieldName: string, state: any) => {
  if (state && state.errors) {
    const error = state.errors.find(
      (err: { field: string; message: string }) => err.field === fieldName
    );
    return error.message;
  } else {
    return null;
  }
};