// Expenses Page Component - Register globally
window.ExpensesPage = function({ expenses, onAddExpense, onDeleteExpense }) {
    return React.createElement(
        'div',
        { className: 'space-y-6' },
        React.createElement(
            'button',
            {
                onClick: onAddExpense,
                className: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition'
            },
            '➕ Add New Expense'
        ),
        React.createElement(
            'div',
            { className: 'bg-white rounded-2xl p-6 shadow-lg' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'All Expenses'),
            expenses.length === 0 
                ? React.createElement('p', { className: 'text-gray-600 text-center py-8' }, 'No expenses added yet')
                : React.createElement(
                    'div',
                    { className: 'space-y-4' },
                    expenses.slice().reverse().map(exp =>
                        React.createElement(
                            'div',
                            { key: exp.id, className: 'flex justify-between items-center p-4 bg-gray-50 rounded-xl' },
                            React.createElement(
                                'div',
                                { className: 'flex-1' },
                                React.createElement('div', { className: 'font-semibold text-lg' }, exp.note || exp.category),
                                React.createElement('div', { className: 'text-sm text-gray-600' }, `${exp.category} • ${new Date(exp.date).toLocaleDateString()}`)
                            ),
                            React.createElement(
                                'div',
                                { className: 'flex items-center space-x-4' },
                                React.createElement('div', { className: 'text-xl font-bold text-purple-600' }, '৳' + exp.amount.toLocaleString()),
                                React.createElement(
                                    'button',
                                    {
                                        onClick: () => onDeleteExpense(exp.id),
                                        className: 'text-red-500 hover:text-red-700 font-bold'
                                    },
                                    '❌'
                                )
                            )
                        )
                    )
                )
        )
    );
};