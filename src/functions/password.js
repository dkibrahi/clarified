export const validPassword = (password='') => {
    const length = password.length;

    if (length <= 7 || length > 12) {
        return 'Password must be between 8 and 12 characters long';
    }

    const containsLowercase = /[a-z]/.test(password);

    if (!containsLowercase) {
        return 'Password must contain at least one lowercase letter';
    }

    const containsUppercase = /[A-Z]/.test(password);

    if (!containsUppercase) {
        return 'Password must contain at least one uppercase letter';
    }

    const containsStrongChar = /[!-=+_;:]/.test(password);

    if (!containsStrongChar) {
        return 'Password must be stronger. Consider using characters such as !_=+-';
    }

    const containsNum = /[0-9]/.test(password);

    if (!containsNum) {
        return 'Password must contain at least one number';
    }

    const containsSpecialChars = /^[`/\|'"[]{}`]+$/.test(password);
    const containsNonAscii = /[^\x00-\x7F]+/.test(password);

    if (containsSpecialChars || containsNonAscii) {
        return 'The password cannot have any special characters. Remove any slashes, qoutes, or braces/brackets';
    }

    return '';
}
