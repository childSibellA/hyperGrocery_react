export const useValidation = (formData, helpTexts) => {
  let errors = {};

  const validation = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    numbers: /^[0-9\b]+$/,
    limitedCharacters: /^.{42}$/,
    hash: /^[a-fA-F0-9]{32}/i,
    number: /^\d+(?:\.\d+)?$/,
    text: /^[-_a-zA-Z0-9]*[a-zA-Z]+[-_a-zA-Z0-9]*$/,
    address: /^0x[a-fA-F0-9]{40}$/,
    multipleOf5000: (num) => !isNaN(num) && num > 0 && num % 5000 === 0,
    between100and500: (num) => !isNaN(num) && num >= 100 && num <= 500,
    max500: (num) => !isNaN(num) && num <= 500000,
    min5000: (num) => !isNaN(num) && num >= 5000 && num <= 500000,
    between100and500: (num) => !isNaN(num) && num >= 10 && num <= 500,
    validLargeAmount: (num) =>
      !isNaN(num) && num > 0 && num % 5000 === 0 && num <= 500000,
    invalid: (num) => false,
  };

  Object.keys(formData).map((key) => {
    const validationType = helpTexts[key].validationType;
    const validationRule = validation[validationType];
    const value = formData[key];

    if (typeof validationRule === "function") {
      if (!validationRule(value) && value.length > 0) {
        errors[key] = {
          failure: helpTexts[key].failure,
        };
      } else if (validationRule(value) && value.length > 0) {
        errors[key] = {
          success: helpTexts[key].success,
        };
      }
    } else {
      if (!validationRule.test(value) && value.length > 0) {
        errors[key] = {
          failure: helpTexts[key].failure,
        };
      } else if (validationRule.test(value) && value.length > 0) {
        errors[key] = {
          success: helpTexts[key].success,
        };
      }
    }
  });

  return errors;
};
