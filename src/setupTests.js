/* eslint-env jest */

import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = {
    getItem: token => {
        if (token === 'FreeTextSearchQueries') {
            return '["abc","xyz"]';
        }
        return '';
    },
    setItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;
