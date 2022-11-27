// react imports
export const validTitle = async (title, setFeedbackDesc, setValid) => {
    if (title.length < 5) {
        setFeedbackDesc('Please enter a title for the post that is at least 5 characters.');
        return false;
    }

    if (title.length >= 30) {
        setFeedbackDesc('Please shorten the length of the post to under 30 characters');
        return false;
    }

    return true;
}

export const cleanTitle = (title) => {
    title = title.trim();
    let linkTitle = title.replace(/[^a-zA-Z ]/g, "");
    linkTitle = linkTitle.replace(/\s\s+/g, ' ');
    linkTitle = linkTitle.replace(/ /g, "-");
    linkTitle = linkTitle.toLowerCase();

    return linkTitle;
};