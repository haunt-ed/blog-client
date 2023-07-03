export interface WithError {
  hasError: boolean;
  globalError: string;
}

export function getFormErrors<T>(
  data: T,
  initialError: T & WithError
): T & WithError {
  let newErrors = {
    ...initialError,
  };

  for (const key in data) {
    if (!data[key]) {
      newErrors = {
        ...newErrors,
        [key]: `${key[0].toUpperCase()}${key.slice(1)} is required`,
        hasError: true,
      };
    }
  }

  return newErrors;
}
