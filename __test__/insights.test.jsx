/*
import { fireEvent, render } from '@testing-library/react-native';
import Insights from '../app/features/insights';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

const mockRoute = {
  params: {
    expenseList: ['Coffee,food & drink,$5.99'],
    output: {
      total: 5.99,
      breakdown: { 'food & drink': 5.99 },
      tips: ['Reduce coffee spending', 'Consider budgeting for dining'],
    },
  },
};

describe('Insights', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders structural components correctly', () => {
    const { getByTestId, getByText } = render(<Insights navigation={mockNavigation} route={mockRoute} />);
    expect(getByTestId('insights-container')).toBeTruthy();
    expect(getByTestId('total-spending')).toBeTruthy();
    expect(getByTestId('breakdown-list')).toBeTruthy();
    expect(getByTestId('tips-list')).toBeTruthy();
    expect(getByText('Spending Insights')).toBeTruthy();
  });

  test('Displays total spending correctly', () => {
    const { getByTestId } = render(<Insights navigation={mockNavigation} route={mockRoute} />);
    expect(getByTestId('total-spending')).toHaveTextContent('Total Spending: $5.99');
  });

  test('Renders category breakdown correctly', () => {
    const { getByText } = render(<Insights navigation={mockNavigation} route={mockRoute} />);
    expect(getByText('food & drink: $5.99')).toBeTruthy();
  });

  test('Renders spending tips correctly', () => {
    const { getByText } = render(<Insights navigation={mockNavigation} route={mockRoute} />);
    expect(getByText('Reduce coffee spending')).toBeTruthy();
    expect(getByText('Consider budgeting for dining')).toBeTruthy();
  });

  test('Handles empty route params gracefully', () => {
    const { getByText } = render(<Insights navigation={mockNavigation} route={{ params: {} }} />);
    expect(getByText('Total Spending: $0.00')).toBeTruthy();
    expect(getByText('No breakdown available')).toBeTruthy();
    expect(getByText('No tips available')).toBeTruthy();
  });

  test('Back button navigates back', () => {
    const { getByTestId } = render(<Insights navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
*/