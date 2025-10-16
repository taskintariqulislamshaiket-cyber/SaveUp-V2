// Main App Component
function App() {
    const { useState, useEffect } = React;
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [showQuiz, setShowQuiz] = useState(false);
    const [personality, setPersonality] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [goals, setGoals] = useState([]);
    const [monthlyBudget, setMonthlyBudget] = useState(30000);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log("Auth state changed:", user ? user.email : "No user");
            if (user) {
                setUser(user);
                try {
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        console.log("User data loaded:", userData);
                        
                        if (userData.personality) {
                            setPersonality(userData.personality);
                        } else {
                            setShowQuiz(true);
                        }
                        
                        if (userData.expenses) setExpenses(userData.expenses);
                        if (userData.goals) setGoals(userData.goals);
                        if (userData.monthlyBudget) setMonthlyBudget(userData.monthlyBudget);
                    } else {
                        console.log("No user data, showing quiz");
                        setShowQuiz(true);
                    }
                } catch (error) {
                    console.error("Error loading user data:", error);
                    setShowQuiz(true);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user && personality) {
            db.collection('users').doc(user.uid).set({
                personality,
                expenses,
                goals,
                monthlyBudget
            }, { merge: true });
        }
    }, [user, personality, expenses, goals, monthlyBudget]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setPersonality(null);
            setExpenses([]);
            setGoals([]);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return React.createElement(
            'div',
            { className: 'min-h-screen flex flex-col items-center justify-center gradient-bg' },
            React.createElement('div', { 
                className: 'spinner', 
                style: { width: '48px', height: '48px', borderWidth: '4px' } 
            }),
            React.createElement('div', { className: 'text-white text-2xl mt-4' }, 'Loading...')
        );
    }

    if (!user) {
        return React.createElement(window.LoginPage, { onLoginSuccess: setUser });
    }

    if (showQuiz) {
        return React.createElement(window.MoneyPersonalityQuiz, {
            onComplete: (result) => {
                setPersonality(result);
                setShowQuiz(false);
            }
        });
    }

    const thisMonthExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = monthlyBudget - thisMonthExpenses;
    const todayExpenses = expenses
        .filter(exp => new Date(exp.date).toDateString() === new Date().toDateString())
        .reduce((sum, exp) => sum + exp.amount, 0);
    const healthScore = Math.max(0, Math.min(100, ((monthlyBudget - thisMonthExpenses) / monthlyBudget * 100)));

    return React.createElement(
        'div',
        { className: 'min-h-screen bg-gray-50' },
        React.createElement(
            'header',
            { className: 'gradient-bg text-white p-4 shadow-lg' },
            React.createElement(
                'div',
                { className: 'max-w-7xl mx-auto flex justify-between items-center' },
                React.createElement('h1', { className: 'text-2xl font-bold' }, 'SaveUp'),
                React.createElement(
                    'div',
                    { className: 'flex items-center space-x-4' },
                    React.createElement('img', {
                        src: user.photoURL,
                        alt: user.displayName,
                        className: 'w-10 h-10 rounded-full border-2 border-white'
                    }),
                    React.createElement('span', { className: 'hidden md:inline' }, user.displayName),
                    React.createElement(
                        'button',
                        {
                            onClick: handleLogout,
                            className: 'bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition'
                        },
                        'Logout'
                    )
                )
            )
        ),
        React.createElement(
            'nav',
            { className: 'bg-white shadow-md sticky top-0 z-10' },
            React.createElement(
                'div',
                { className: 'max-w-7xl mx-auto px-4' },
                React.createElement(
                    'div',
                    { className: 'flex space-x-8 overflow-x-auto' },
                    ['dashboard', 'expenses', 'goals', 'reports'].map(page =>
                        React.createElement(
                            'button',
                            {
                                key: page,
                                onClick: () => setCurrentPage(page),
                                className: `py-4 px-6 font-semibold whitespace-nowrap capitalize ${
                                    currentPage === page
                                        ? 'text-purple-600 border-b-2 border-purple-600'
                                        : 'text-gray-600 hover:text-purple-600'
                                }`
                            },
                            page === 'dashboard' ? '📊 Dashboard' :
                            page === 'expenses' ? '💸 Expenses' :
                            page === 'goals' ? '🎯 Goals' : '📈 Reports'
                        )
                    )
                )
            )
        ),
        React.createElement(
            'main',
            { className: 'max-w-7xl mx-auto p-4 pb-20' },
            currentPage === 'dashboard' && React.createElement(window.Dashboard, {
                personality,
                thisMonthExpenses,
                remaining,
                todayExpenses,
                healthScore,
                expenses,
                onAddExpense: () => setShowExpenseModal(true)
            }),
            currentPage === 'expenses' && React.createElement(window.ExpensesPage, {
                expenses,
                onAddExpense: () => setShowExpenseModal(true),
                onDeleteExpense: (id) => setExpenses(expenses.filter(e => e.id !== id))
            }),
            currentPage === 'goals' && React.createElement(window.GoalsPage, {
                goals,
                setGoals
            }),
            currentPage === 'reports' && React.createElement(window.ReportsPage, {
                expenses
            })
        ),
        showExpenseModal && React.createElement(window.ExpenseModal, {
            onClose: () => setShowExpenseModal(false),
            onSave: (expense) => {
                setExpenses([...expenses, { ...expense, id: Date.now() }]);
                setShowExpenseModal(false);
            }
        })