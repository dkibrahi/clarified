// react
import { render, fireEvent, getByText, getByTestId, screen } from "@testing-library/react";
import * as React from 'react';

// component
import Flag from './Flag';

describe(Flag, () => { 
    it("Ensure that user can see the modal once they click on the flag icon", () => {
        render(<Flag postID='' author='' admin={false}/>);

        const flagIcon = screen.getByTestId('flag');

        fireEvent.click(flagIcon);

        const reportUserText = screen.getByText('Report User');
        expect(reportUserText).toBeInTheDocument();
    });

    it("Expect error message to show up if user leaves description for report blank", () => {
        render(<Flag postID='' author='' admin={false}/>);

        const flagIcon = screen.getByTestId('flag');

        fireEvent.click(flagIcon);

        const submitButton = screen.getByText('Submit');
        
        fireEvent.click(submitButton);

        const errorText = screen.getByText('Description too short');
        expect(errorText).toBeInTheDocument();
    });
 });