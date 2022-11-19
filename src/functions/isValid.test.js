// react import
import * as React from 'react';
import { useState } from 'react';

// title
import validTitle from "./isValid";



describe('Testing title validity', () => {
    it("empty title return false", async () => {
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');

        useStateSpy.mockImplementation((init) => [init, setState]);

        expect(await validTitle('', setState, setState)).toBeFalsy();

    });
});