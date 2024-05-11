/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiErrorResponse {
  status: number;
  data: { message: string; errors: { [k: string]: string[] } };
}

const isApiResponseError = (error: unknown): error is ApiErrorResponse => {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof (error as any).status === 'number'
  );
};

export default isApiResponseError;
