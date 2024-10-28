export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_TEXT_MESSAGE = "Password must be at least 8 characters, contain a number, an uppercase letter and a special character!"
export const EMAIL_TEXT_MESSAGE = "Please enter a valid email address!"