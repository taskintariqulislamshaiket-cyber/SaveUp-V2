// Expense Modal Component - Register globally
window.ExpenseModal = function({ onClose, onSave }) {
    const [expense, setExpense] = React.useState({
        amount: '',
        category: 'Food',
        note: '',
        date: new Date().toISOString().split('T')[0]
    });

    const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Education', 'Others'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expense.amount) {
            onSave({ ...expense, amount: parseFloat(expense.amount) });
        }
    };

    return React.createElement(
        'div',
        { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50' },
        React.createElement(
            'div',
            { className: 'bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl' },
            React.createElement(
                'div',
                { className: 'flex justify-between items-center mb-6' },
                React.createElement('h2', { className: 'text-2xl font-bold' }, 'Add New Expense'),
                React.createElement('button', { onClick: onClose, className: 'text-2xl' }, '×')
            ),
            React.createElement(
                'form',
                { onSubmit: handleSubmit, className: 'space-y-4' },
                React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-semibold mb-2' }, 'Amount (৳)'),
                    React.createElement('input', {
                        type: 'number',
                        value: expense.amount,
                        onChange: (e) => setExpense({ ...expense, amount: e.target.value }),
                        className: 'w-full p-3 border-2 border-gray-300 rounded-lg',
                        placeholder: '0',
                        required: true
                    })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-semibold mb-2' }, 'Category'),
                    React.createElement(
                        'select',
                        {
                            value: expense.category,
                            onChange: (e) => setExpense({ ...expense, category: e.target.value }),
                            className: 'w-full p-3 border-2 border-gray-300 rounded-lg'
                        },
                        categories.map(cat => React.createElement('option', { key: cat, value: cat }, cat))
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-semibold mb-2' }, 'Note (optional)'),
                    React.createElement('input', {
                        type: 'text',
                        value: expense.note,
                        onChange: (e) => setExpense({ ...expense, note: e.target.value }),
                        className: 'w-full p-3 border-2 border-gray-300 rounded-lg',
                        placeholder: 'What was this for?'
                    })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-semibold mb-2' }, 'Date'),
                    React.createElement('input', {
                        type: 'date',
                        value: expense.date,
                        onChange: (e) => setExpense({ ...expense, date: e.target.value }),
                        className: 'w-full p-3 border-2 border-gray-300 rounded-lg'
                    })
                ),
                React.createElement(
                    'button',
                    {
                        type: 'submit',
                        className: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition'
                    },
                    '✅ Add Expense'
                )
            )
        )
    );
};