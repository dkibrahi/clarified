// react imports
export const validTitle = async (title, setFeedbackDesc, setValid) => {
    if (title.length === 0) {
        setFeedbackDesc('Please enter a title for the post');
        return false;
    }

    if (title.length >= 40) {
        setFeedbackDesc('Please shorten the length of the post to under 40 characters');
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