//import renderer from 'react-test-renderer';

import { render } from '@testing-library/react-native';
import Investments from '../app/features/investments';


describe('<Investments />', () => {
    test('Text renders correctly on Investments', () => {
        const { getByText } = render(<Investments />);
        getByText('Investments');
    });
})
