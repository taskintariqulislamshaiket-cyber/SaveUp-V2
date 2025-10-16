// Reports Page Component - Register globally
window.ReportsPage = function({ expenses }) {
    const monthlyData = expenses.reduce((acc, exp) => {
        const month = new Date(exp.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!acc[month]) acc[month] = {};
        acc[month][exp.category] = (acc[month][exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    return React.createElement(
        'div',
        { className: 'space-y-6' },
        React.createElement(
            'div',
            { className: 'bg-white rounded-2xl p-6 shadow-lg' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Monthly Reports'),
            Object.keys(monthlyData).length === 0 
                ? React.createElement('p', { className: 'text-gray-600 text-center py-8' }, 'Not enough data yet')
                : Object.entries(monthlyData).map(([month, categories]) => {
                    const total = Object.values(categories).reduce((sum, amt) => sum + amt, 0);
                    return React.createElement(
                        'div',
                        { key: month, className: 'mb-8' },
                        React.createElement('h3', { className: 'text-xl font-bold mb-4' }, month),
                        React.createElement(
                            'div',
                            { className: 'mb-4' },
                            React.createElement(
                                'div',
                                { className: 'flex justify-between mb-2' },
                                React.createElement('span', { className: 'font-semibold' }, 'Total Spent'),
                                React.createElement('span', { className: 'text-purple-600 font-bold' }, '৳' + total.toLocaleString())
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'space-y-3' },
                            Object.entries(categories).map(([category, amount]) =>
                                React.createElement(
                                    'div',
                                    { key: category },
                                    React.createElement(
                                        'div',
                                        { className: 'flex justify-between mb-1' },
                                        React.createElement('span', null, category),
                                        React.createElement('span', { className: 'text-gray-600' }, '৳' + amount.toLocaleString())
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'w-full bg-gray-200 rounded-full h-2' },
                                        React.createElement('div', {
                                            className: 'bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full',
                                            style: { width: `${(amount / total) * 100}%` }
                                        })
                                    )
                                )
                            )
                        )
                    );
                })
        )
    );
};