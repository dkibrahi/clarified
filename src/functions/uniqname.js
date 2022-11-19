export const validUniqname = (umichName='') => {
    umichName = cleanInput(umichName);

    const length = umichName.length;

    if (length < 3 || length > 8) {
        return false;
    }

    const onlyLowercase = /^[a-z]+$/.test(umichName);
    
    return onlyLowercase;
}

const cleanInput = (umichName) => {
    if (!umichName) {
        return '';
    }

    umichName = umichName.toLowerCase();
    umichName = umichName.trim();

    return umichName;
}
