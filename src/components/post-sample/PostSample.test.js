// react
import { render, screen } from "@testing-library/react";


// component 
import PostSample from "./PostSample";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe(PostSample, () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("edit is false when clicked on fab", () => {
        const post = {
            title: 'Introduction',
            date: new Date(),
            content: 'Anything',
            author: 'anything'
        }

        const expected = {
            "pathname": '/posts/introduction',
            'edit': false
        }

        render(<PostSample post={post} />);

        screen.getByText('Full Post').click();

        expect(mockHistoryPush).toBeCalledWith({"pathname": "/posts/introduction", "state": {"edit": false}});
    });
});