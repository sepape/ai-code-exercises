const assert = require('node:assert');

const originalValidateUserData = require('./original');

const {
  validateUserData: refactoredValidateUserData
} = require('./refactored');

let passedTests = 0;
let failedTests = 0;

function runTest(testName, userData, options, expectedErrors) {
  try {
    const originalResult = originalValidateUserData(
      userData,
      options
    );

    const refactoredResult = refactoredValidateUserData(
      userData,
      options
    );

    assert.deepStrictEqual(
      refactoredResult,
      originalResult,
      'The refactored result does not match the original result.'
    );

    assert.deepStrictEqual(
      refactoredResult,
      expectedErrors,
      'The result does not match the expected validation errors.'
    );

    console.log(`PASS: ${testName}`);
    passedTests++;
  } catch (error) {
    console.error(`FAIL: ${testName}`);
    console.error(error.message);
    failedTests++;
  }
}

const checkExisting = {
  usernameExists(username) {
    return username === 'existing_user';
  },

  emailExists(email) {
    return email === 'registered@example.com';
  }
};

runTest(
  'Valid registration',
  {
    username: 'new_user',
    email: 'new@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!'
  },
  {
    isRegistration: true,
    checkExisting
  },
  []
);

runTest(
  'Missing registration fields',
  {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  {
    isRegistration: true
  },
  [
    'username is required for registration',
    'email is required for registration',
    'password is required for registration',
    'confirmPassword is required for registration',
    'Email is required'
  ]
);

runTest(
  'Username is too short',
  {
    username: 'ab',
    email: 'person@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!'
  },
  {
    isRegistration: true
  },
  [
    'Username must be at least 3 characters long'
  ]
);

runTest(
  'Username already exists',
  {
    username: 'existing_user',
    email: 'person@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!'
  },
  {
    isRegistration: true,
    checkExisting
  },
  [
    'Username is already taken'
  ]
);

runTest(
  'Weak password and mismatched confirmation',
  {
    username: 'new_user',
    email: 'person@example.com',
    password: 'password1!',
    confirmPassword: 'different'
  },
  {
    isRegistration: true
  },
  [
    'Password must contain at least one uppercase letter',
    'Password and confirmation do not match'
  ]
);

runTest(
  'Invalid email address',
  {
    email: 'incorrect-email'
  },
  {},
  [
    'Email format is invalid'
  ]
);

runTest(
  'Email already registered',
  {
    username: 'new_user',
    email: 'registered@example.com',
    password: 'Password1!',
    confirmPassword: 'Password1!'
  },
  {
    isRegistration: true,
    checkExisting
  },
  [
    'Email is already registered'
  ]
);

runTest(
  'Invalid date of birth',
  {
    dateOfBirth: 'not-a-date'
  },
  {},
  [
    'Date of birth is not a valid date'
  ]
);

runTest(
  'Address must be an object',
  {
    address: '123 Main Street'
  },
  {},
  [
    'Address must be an object with required fields'
  ]
);

runTest(
  'Missing address fields',
  {
    address: {
      street: '',
      city: '',
      zip: '',
      country: ''
    }
  },
  {},
  [
    'Address street is required',
    'Address city is required',
    'Address zip is required',
    'Address country is required'
  ]
);

runTest(
  'Invalid US ZIP code',
  {
    address: {
      street: '10 Main Street',
      city: 'New York',
      zip: 'ABC',
      country: 'US'
    }
  },
  {},
  [
    'Invalid US ZIP code format'
  ]
);

runTest(
  'Invalid phone number',
  {
    phone: '123'
  },
  {},
  [
    'Phone number format is invalid'
  ]
);

runTest(
  'Custom validation failure',
  {
    employeeNumber: 'ABC'
  },
  {
    customValidations: [
      {
        field: 'employeeNumber',

        validator(value) {
          return /^\d+$/.test(value);
        },

        message: 'Employee number must contain only numbers'
      }
    ]
  },
  [
    'Employee number must contain only numbers'
  ]
);

console.log('\nTest summary');
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);

if (failedTests > 0) {
  process.exitCode = 1;
}