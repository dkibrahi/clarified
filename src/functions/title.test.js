// react import
import * as React from 'react';

// title
import { validTitle } from './title';
import { cleanTitle } from './title';

describe('Testing title validity', () => {
    it("empty title return false", async () => {
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');

        useStateSpy.mockImplementation((init) => [init, setState]);

        expect(await validTitle('', setState, setState)).toBeFalsy();

    });

    it("title that is too long should return false", async () => {
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');

        useStateSpy.mockImplementation((init) => [init, setState]);

        const title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

        expect(await validTitle(title, setState, setState)).toBeFalsy();

    });
});

// cleanTitle() will be used as the slug URL. This is different than the actual title of the post
describe ('Testing cleanTitle', () => {
    it("Casing is removed from title", () => {
       const res = cleanTitle('Introduction');
       expect(res).toEqual('introduction');
    });

    it("puncuation is removed from title", () => {
        const res = cleanTitle('introduction!!!!!!!!!!!!!!!,.,.,.,..,');
        expect(res).toEqual('introduction');
    });

    it("Spacing is removed from title", () => {
        const res = cleanTitle('introduction    to    class');
        expect(res).toEqual('introduction-to-class');
    });

    it("remove leading and trailing whitespace", () => {
        const res = cleanTitle('  introduction to class  ');
        expect(res).toEqual('introduction-to-class');
    });

    it("edge case", () => {
        const res = cleanTitle('Introduction ,/. to    class');
        expect(res).toEqual('introduction-to-class');
    });
})