// react
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';


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

    it("Casing is removed from title", () => {
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

    it("puncuation is removed from title", () => {
        const post = {
            title: 'introduction!!!!!!!!!!!!!!!,.,.,.,..,',
            date: new Date(),
            content: 'Anything',
            author: 'anything'
        }

        render(<PostSample post={post} />);

        screen.getByText('Full Post').click();

        expect(mockHistoryPush).toBeCalledWith({"pathname": "/posts/introduction", "state": {"edit": false}});
    });

    it("Spacing is removed from title", () => {
        const post = {
            title: 'introduction    to    class',
            date: new Date(),
            content: 'Anything',
            author: 'anything'
        }

        render(<PostSample post={post} />);

        screen.getByText('Full Post').click();

        expect(mockHistoryPush).toBeCalledWith({"pathname": "/posts/introduction-to-class", "state": {"edit": false}});
    });
});