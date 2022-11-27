export const validPassword = (password='') => {
    const length = password.length;

    if (length < 7 || length > 12) {
        return false;
    }

    const containsSpecialChars = /^[`/\|;:'"[]{}`]+$/.test(password);
    
    return !containsSpecialChars;
}
