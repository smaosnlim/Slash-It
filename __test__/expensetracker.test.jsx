   import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ExpenseTracker from '../app/features/expensetracker';

   jest.mock('firebase/functions', () => {
     const mockGetInsights = jest.fn();
     return {
       getFunctions: jest.fn(() => ({})),
       httpsCallable: jest.fn(() => mockGetInsights),
       mockGetInsights, // Export for test access
     };
   });

   const mockNavigate = jest.fn();
   const mockNavigation = {
     navigate: mockNavigate,
     canGoBack: jest.fn(() => true),
     goBack: jest.fn(),
   };

   describe('ExpenseTracker', () => {
     beforeEach(() => {
       jest.clearAllMocks();
     });

     test('Renders structural components correctly', () => {
       const { getByTestId, getByText } = render(<ExpenseTracker navigation={mockNavigation} />);
       expect(getByTestId('safe-area-view')).toBeTruthy();
       expect(getByTestId('container-view')).toBeTruthy();
       expect(getByText('Expense Tracker')).toBeTruthy();
     });

     test('Title text has correct styles', () => {
       const { getByText } = render(<ExpenseTracker navigation={mockNavigation} />);
       const title = getByText('Expense Tracker');
       expect(title).toHaveStyle({ fontSize: 28, fontWeight: '600', color: '#FFFFFF' });
     });

     test('Does not crash with undefined navigation', () => {
       const { getByText } = render(<ExpenseTracker navigation={undefined} />);
       expect(getByText('Expense Tracker')).toBeTruthy();
     });

     test('Adds an expense correctly', () => {
       const { getByPlaceholderText, getByText, getByTestId } = render(<ExpenseTracker navigation={mockNavigation} />);
       
       fireEvent.changeText(getByPlaceholderText('Expense Name'), 'Coffee');
       fireEvent.press(getByText('Select a category'));
       fireEvent.press(getByTestId('picker-item-food & drink'));
       fireEvent.changeText(getByPlaceholderText('Amount'), '5.99');
       fireEvent.press(getByTestId('icon-add'));

       expect(getByText('Coffee')).toBeTruthy();
       expect(getByText('food & drink')).toBeTruthy();
       expect(getByText('$5.99')).toBeTruthy();
     });

     test('Removes an expense correctly', () => {
       const { getByPlaceholderText, getByText, queryByText, getByTestId } = render(<ExpenseTracker navigation={mockNavigation} />);
       
       fireEvent.changeText(getByPlaceholderText('Expense Name'), 'Coffee');
       fireEvent.press(getByText('Select a category'));
       fireEvent.press(getByTestId('picker-item-food & drink'));
       fireEvent.changeText(getByPlaceholderText('Amount'), '5.99');
       fireEvent.press(getByTestId('icon-add'));

       fireEvent.press(getByTestId('icon-delete'));
       expect(queryByText('Coffee')).toBeNull();
       expect(queryByText('food & drink')).toBeNull();
       expect(queryByText('$5.99')).toBeNull();
     });

     test('Back button navigates to Home', () => {
       const { getByTestId } = render(<ExpenseTracker navigation={mockNavigation} />);
       fireEvent.press(getByTestId('icon-arrow-back'));
       expect(mockNavigate).toHaveBeenCalledWith('Home');
     });

     test('Confirm button navigates to Insights with expenses', async () => {
       const { mockGetInsights } = require('firebase/functions');
       mockGetInsights.mockResolvedValue({ data: { total: 5.99, breakdown: { 'food & drink': 5.99 }, tips: ['Reduce coffee spending'] } });

       const { getByPlaceholderText, getByText, getByTestId } = render(<ExpenseTracker navigation={mockNavigation} />);
       
       fireEvent.changeText(getByPlaceholderText('Expense Name'), 'Coffee');
       fireEvent.press(getByText('Select a category'));
       fireEvent.press(getByTestId('picker-item-food & drink'));
       fireEvent.changeText(getByPlaceholderText('Amount'), '5.99');
       fireEvent.press(getByTestId('icon-add'));

       await fireEvent.press(getByTestId('icon-check'));
       await waitFor(
         () => {
           expect(mockGetInsights).toHaveBeenCalledWith({
             grokPrompt: expect.stringContaining('Coffee,food & drink,$5.99'),
           });
           expect(mockNavigate).toHaveBeenCalledWith('Insights', {
             expenseList: ['Coffee,food & drink,$5.99'],
             output: { total: 5.99, breakdown: { 'food & drink': 5.99 }, tips: ['Reduce coffee spending'] },
           });
         },
         { timeout: 2000 }
       );
     });

     test('Confirm button logs error and navigates back on getInsights failure', async () => {
       const { mockGetInsights } = require('firebase/functions');
       mockGetInsights.mockRejectedValue(new Error('Insights failed'));
       const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

       const { getByPlaceholderText, getByText, getByTestId } = render(<ExpenseTracker navigation={mockNavigation} />);
       
       fireEvent.changeText(getByPlaceholderText('Expense Name'), 'Coffee');
       fireEvent.press(getByText('Select a category'));
       fireEvent.press(getByTestId('picker-item-food & drink'));
       fireEvent.changeText(getByPlaceholderText('Amount'), '5.99');
       fireEvent.press(getByTestId('icon-add'));

       await fireEvent.press(getByTestId('icon-check'));
       await waitFor(
         () => {
           expect(mockGetInsights).toHaveBeenCalled();
           expect(consoleErrorSpy).toHaveBeenCalledWith('Navigation error:', expect.any(Error));
           expect(mockNavigation.goBack).toHaveBeenCalled();
         },
         { timeout: 2000 }
       );

       consoleErrorSpy.mockRestore();
     });

     test('Confirm button logs error when no expenses are added', async () => {
       const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
       const { getByTestId } = render(<ExpenseTracker navigation={mockNavigation} />);
       
       await fireEvent.press(getByTestId('icon-check'));
       expect(consoleLogSpy).toHaveBeenCalledWith('Please add at least 1 expense');
       expect(mockNavigate).not.toHaveBeenCalled();

       consoleLogSpy.mockRestore();
     });
   });
   