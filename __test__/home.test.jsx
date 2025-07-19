/*
import { render } from '@testing-library/react-native';
import Home from '../app/tabs/home';

describe('<Home />', () => {
    test("Text renders correctly on Home", () => {
        const { getByText } = render(<Home />);
        getByText('Welcome Home');
    })
})
*/

import { render } from '@testing-library/react-native';
import Home from '../app/tabs/home';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe('<Home />', () => {
  test('Text renders correctly on Home', () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);
    expect(getByText('Welcome Home')).toBeTruthy();
  });
});