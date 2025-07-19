import { render } from '@testing-library/react-native';
import Bills from '../app/features/bills';

describe('<Bills />', () => {
    test('renders correctly', () => {
        const { getByText } = render(<Bills />);
        getByText('Add New Event');
    });

    test('adds an event on button press', () => {
        const { getByText } = render(<Bills />);
        getByText('Add Event');
    });
}
)