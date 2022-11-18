// react
import { render } from "@testing-library/react";

// component
import UserPosts from "./UserPosts";

describe(UserPosts, () => { 
    it("Component returns default message when posts is empty", () => {
        const {} = render(<UserPosts posts={[]} />)
    });
 })