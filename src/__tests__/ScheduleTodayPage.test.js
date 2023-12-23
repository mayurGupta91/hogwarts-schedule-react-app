/* eslint-env jest */

// ScheduleTodayPage.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import ScheduleTodayPage from '../App';

describe('ScheduleTodayPage Component', () => {
    test('renders ScheduleTodayPage component snapshot', () => {
        const component = <ScheduleTodayPage />;
        expect(shallow(component)).toMatchSnapshot();
    });

    test('handles attendance change for each teacher', () => {
        const { getAllByDisplayValue } = render(<ScheduleTodayPage />);

        const presentElements = getAllByDisplayValue('Present');
        fireEvent.change(presentElements[5], { target: { value: 'Absent' } });
        fireEvent.change(presentElements[4], { target: { value: 'Absent' } });
        fireEvent.change(presentElements[3], { target: { value: 'Absent' } });
        fireEvent.change(presentElements[2], { target: { value: 'Absent' } });
        fireEvent.change(presentElements[1], { target: { value: 'Absent' } });
        fireEvent.change(presentElements[0], { target: { value: 'Absent' } });

        const absentElements = getAllByDisplayValue('Absent');
        fireEvent.change(absentElements[5], { target: { value: 'Present' } });
        fireEvent.change(absentElements[4], { target: { value: 'Present' } });
        fireEvent.change(absentElements[3], { target: { value: 'Present' } });
        fireEvent.change(absentElements[2], { target: { value: 'Present' } });
        fireEvent.change(absentElements[1], { target: { value: 'Present' } });
        fireEvent.change(absentElements[0], { target: { value: 'Present' } });
    });
});
