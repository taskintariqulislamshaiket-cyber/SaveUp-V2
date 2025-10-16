// Dashboard Component
function Dashboard({ personality, thisMonthExpenses, remaining, todayExpenses, healthScore, expenses, onAddExpense }) {
    const categoryData = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            {personality && (
                <div className={`bg-gradient-to-r ${personalities[personality].color} rounded-2xl p-6 text-white shadow-lg`}>
                    <h2 className="text-2xl font-bold mb-2">{personalities[personality].name}</h2>
                    <p className="mb-2">{personalities[personality].description}</p>
                    <p className="text-sm opacity-90">💡 {personalities[personality].tips}</p>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-gray-600 text-sm mb-2">This Month</div>
                    <div className="text-2xl font-bold text-purple-600">৳{thisMonthExpenses.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-gray-600 text-sm mb-2">Remaining</div>
                    <div className="text-2xl font-bold text-green-600">৳{remaining.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-gray-600 text-sm mb-2">Today</div>
                    <div className="text-2xl font-bold text-blue-600">৳{todayExpenses.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-gray-600 text-sm mb-2">Health Score</div>
                    <div className="text-2xl font-bold text-pink-600">{Math.round(healthScore)}%</div>
                </div>
            </div>

            <button
                onClick={onAddExpense}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
                ➕ Add New Expense
            </button>

            {Object.keys(categoryData).length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
                    {Object.entries(categoryData).map(([category, amount]) => (
                        <div key={category} className="mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">{category}</span>
                                <span className="text-purple-600">৳{amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                                    style={{ width: `${(amount / thisMonthExpenses) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {expenses.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Recent Expenses</h3>
                    {expenses.slice(-5).reverse().map(exp => (
                        <div key={exp.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                            <div>
                                <div className="font-semibold">{exp.note || exp.category}</div>
                                <div className="text-sm text-gray-600">{new Date(exp.date).toLocaleDateString()}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-purple-600">৳{exp.amount.toLocaleString()}</div>
                                <div className="text-sm text-gray-600">{exp.category}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}