// Goals Page Component - Register globally
window.GoalsPage = function({ goals, setGoals }) {
    const [showAddGoal, setShowAddGoal] = React.useState(false);
    const [newGoal, setNewGoal] = React.useState({ name: '', target: '', saved: 0 });

    const addGoal = () => {
        if (newGoal.name && newGoal.target) {
            setGoals([...goals, { ...newGoal, id: Date.now(), target: parseFloat(newGoal.target) }]);
            setNewGoal({ name: '', target: '', saved: 0 });
            setShowAddGoal(false);
        }
    };

    const updateGoalSavings = (id, amount) => {
        setGoals(goals.map(g => g.id === id ? { ...g, saved: g.saved + amount } : g));
    };

    return React.createElement(
        'div',
        { className: 'space-y-6' },
        React.createElement(
            'button',
            {
                onClick: () => setShowAddGoal(!showAddGoal),
                className: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition'
            },
            showAddGoal ? '❌ Cancel' : '➕ Add New Goal'
        ),
        showAddGoal && React.createElement(
            'div',
            { className: 'bg-white rounded-2xl p-6 shadow-lg' },
            React.createElement('input', {
                type: 'text',
                placeholder: 'Goal name (e.g., New Phone)',
                value: newGoal.name,
                onChange: (e) => setNewGoal({ ...newGoal, name: e.target.value }),
                className: 'w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            }),
            React.createElement('input', {
                type: 'number',
                placeholder: 'Target amount (৳)',
                value: newGoal.target,
                onChange: (e) => setNewGoal({ ...newGoal, target: e.target.value }),
                className: 'w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            }),
            React.createElement(
                'button',
                {
                    onClick: addGoal,
                    className: 'w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition'
                },
                '✅ Create Goal'
            )
        ),
        goals.length === 0 
            ? React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg text-center text-gray-600' }, 'No goals set yet. Start by adding your first savings goal!')
            : React.createElement(
                'div',
                { className: 'space-y-4' },
                goals.map(goal => {
                    const progress = (goal.saved / goal.target) * 100;
                    return React.createElement(
                        'div',
                        { key: goal.id, className: 'bg-white rounded-2xl p-6 shadow-lg' },
                        React.createElement(
                            'div',
                            { className: 'flex justify-between items-center mb-4' },
                            React.createElement('h3', { className: 'text-xl font-bold' }, goal.name),
                            React.createElement('span', { className: 'text-sm text-gray-600' }, Math.round(progress) + '%')
                        ),
                        React.createElement(
                            'div',
                            { className: 'w-full bg-gray-200 rounded-full h-4 mb-4' },
                            React.createElement('div', {
                                className: 'bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500',
                                style: { width: `${Math.min(progress, 100)}%` }
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'flex justify-between items-center mb-4' },
                            React.createElement('span', { className: 'text-gray-600' }, 'Saved: ৳' + goal.saved.toLocaleString()),
                            React.createElement('span', { className: 'text-gray-600' }, 'Target: ৳' + goal.target.toLocaleString())
                        ),
                        React.createElement(
                            'div',
                            { className: 'flex space-x-2' },
                            React.createElement('button', {
                                onClick: () => updateGoalSavings(goal.id, 500),
                                className: 'flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition'
                            }, '+৳500'),
                            React.createElement('button', {
                                onClick: () => updateGoalSavings(goal.id, 1000),
                                className: 'flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition'
                            }, '+৳1000'),
                            React.createElement('button', {
                                onClick: () => {
                                    const amount = prompt('How much to add?');
                                    if (amount) updateGoalSavings(goal.id, parseFloat(amount));
                                },
                                className: 'flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition'
                            }, 'Custom')
                        )
                    );
                })
            )
    );
};s