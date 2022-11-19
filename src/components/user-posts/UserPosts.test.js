// react
import { render } from "@testing-library/react";

// component
import UserPosts from "./UserPosts";

describe(UserPosts, () => { 
    it("Component returns default message when posts is empty", () => {
        const { container } = render(<UserPosts posts={[]} />);
        const errorDiv = container.getElementsByClassName('error');
        const postDiv = container.getElementsByClassName('post-list');

        // expect error message to be returned instead of posts
        expect(errorDiv.length).toBeTruthy(); 
        expect(postDiv.length).toBeFalsy(); 
    });
 });