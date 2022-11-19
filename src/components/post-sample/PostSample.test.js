// react
import { render } from "@testing-library/react";


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
    it("Title is changed correctly", () => {
        const post = {
            title: 'Anything',
            date: new Date(),
            content: 'Anything',
            author: 'anything'
        }

        const { container } = render(<PostSample post={post} />);
        

        // expect error message to be returned instead of posts
        // expect(errorDiv.length).toBeTruthy(); 
        // expect(postDiv.length).toBeFalsy(); 
    });
});