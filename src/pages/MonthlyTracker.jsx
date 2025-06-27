import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import React, { useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { AlertTriangle, SmilePlus, Sparkles } from 'lucide-react'

const ExpensesList = ({ title = '', description = '', amount = 0, date = '' }) => {
    return (
        <Card className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 shadow-sm dark:border-gray-700 transition hover:shadow-md mb-3">
            <CardContent className="flex items-center justify-between gap-4 p-3">
                <div className="flex-1 text-start">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">📅 {new Date(date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">$ {amount}</p>
                </div>
            </CardContent>
        </Card>
    )
}
const MonthExpenseCard = ({ targetAmount, setTargetAmount }) => {
    const amountRef = useRef(null)
    const handleAdd = () => {
        if (amountRef.current) {
            amountRef.current.focus();
        }
    };
    const handleEditedAmount = (e) => {
        const text = e?.currentTarget?.textContent
        const numericValue = text.replace(/[^0-9.]/g, "");
        setTargetAmount(numericValue);
    };
    return (
        <Card className="bg-gradient-to-br from-blue-100 via-white to-purple-100 border-none shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center justify-center space-y-1 text-center">
                <Sparkles className="text-blue-500 animate-pulse" size={28} />
                <CardTitle className="text-2xl font-bold tracking-tight text-gray-800">
                    Monthly Target
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-4">
                {/* Amount Display + Editable */}
                <div className="flex items-baseline gap-1 text-blue-700 text-4xl font-extrabold">
                    <span>$</span>
                    <p
                        ref={amountRef}
                        contentEditable
                        tabIndex={0}
                        onInput={(e) => handleEditedAmount(e)}
                        suppressContentEditableWarning
                        className="outline-none focus:ring focus:ring-blue-300 rounded-md px-1 transition"
                    >
                        {targetAmount}
                    </p>
                </div>
                <Button
                    onClick={handleAdd}
                    className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
                >
                    Edit Target
                </Button>
                <p className="text-sm text-gray-600 italic text-center">
                    "Small steps lead to big savings. Keep going!"
                </p>
            </CardContent>
        </Card>
    )
}
const GetExpenses = ({ handleExpense = () => { }, handleSubmit = () => { }, expense = {} }) => {
    const fields = [
        { name: 'title', value: expense?.title, placeholder: 'for expense title', },
        { name: 'description', value: expense?.description, placeholder: 'Add your expese description', },
        { name: 'amount', type: "number", value: expense?.amount, placeholder: 'Enter Amount', }
    ]
    return (
        <Card className="pt-0 col-span-1 border-none md:col-span-6 md:col-start-7 md:row-start-2">
            <CardContent className="text-center p-4">
                <Card className={"border-none"}>
                    <CardHeader>
                        <CardTitle>Add Expense</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {fields.map((keys, index) => (
                                <Input
                                    {...keys}
                                    key={index}
                                    onChange={handleExpense}
                                />
                            ))}
                            <Button type="submit">Add</Button>
                        </form>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
const SavingsResultCard = ({ targetAmount, TotalMonthExpense }) => {
    const difference = parseInt(targetAmount) - parseInt(TotalMonthExpense || 0);
    const isOverSpent = difference < 0;

    return (
        <Card
            className={`rounded-lg p-5 shadow-md border md:col-span-6 md:row-span-2 md:col-start-7 md:row-start-4 
        ${isOverSpent ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}
      `}
        >
            <CardContent className="flex flex-col items-center text-center space-y-2">
                {isOverSpent ? (
                    <>
                        <AlertTriangle className="text-red-500" size={28} />
                        <p className="text-2xl font-semibold text-red-600">Overspent by ${Math.abs(difference)}</p>
                        <p className="text-sm text-red-500 italic">
                            Oops! You’ve gone over your monthly target. Try adjusting next month’s budget.
                        </p>
                    </>
                ) : (
                    <>
                        <SmilePlus className="text-green-600" size={28} />
                        <p className="text-2xl font-semibold text-green-700">Saved ${difference}</p>
                        <p className="text-sm text-green-600 italic">
                            Great job staying under budget! Keep up the smart saving!
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

const MonthlyTracker = () => {
    const [expenses, setExpenses] = useState([])
    const [expense, setExpense] = useState({ title: '', description: '', amount: 0, date: '' })
    const [targetAmount, setTargetAmount] = useState('20000')
    const handleExpense = (e) => {
        const { name, value } = e.target;
        setExpense(pre => ({ ...pre, [name]: value, date: new Date() }))
    }
    const TotalMonthExpense = expenses.reduce(
        (acc, curr) => acc + parseInt(curr.amount || 0),
        0
    );
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (!expense?.title || !parseInt(expense?.amount)) {
                throw new Error("Title and amount are required");
            }

            if (typeof parseInt(expense.amount) !== "number" || isNaN(expense.amount)) {
                throw new Error("Amount must be a valid number");
            }

            setExpenses(prev => [...prev, { ...expense }]);
            setExpense({ title: '', description: '', amount: 0, date: '' });

        } catch (err) {
            console.error("Error in handleSubmit:", err.message);
            alert(err.message);
        }
    };
    return (
        <section className="p-4 grid gap-4 md:grid-cols-12 md:grid-rows-6 md:gap-2">
            <header className=" rounded-lg p-4  md:col-span-12">
                <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-800 dark:text-white">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-4xl sm:text-5xl md:text-6xl animate-fade-in-down">
                            Welcome to
                        </span>
                        <span className="block mt-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl">
                            Monthly Tracker
                        </span>
                    </h1>
                </div>
            </header>

            <article className="bg-white   p-4  md:col-span-6 md:row-span-2 md:row-start-2">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-sm text-gray-600">This section gives a summary of your monthly activity.</p>
                <GetExpenses
                    handleExpense={handleExpense}
                    handleSubmit={handleSubmit}
                    expense={expense} />
            </article>

            <article className="bg-white rounded-lg p-4   md:col-span-6 md:row-span-2 md:col-start-7 md:row-start-2">
                <MonthExpenseCard targetAmount={targetAmount} setTargetAmount={setTargetAmount} />
            </article>
            <section className="bg-white rounded-lg p-4   md:col-span-6 md:row-span-2 md:row-start-4">
                {expenses.map((expense, index) => (
                    <ExpensesList {...expense} key={index} />
                ))}

            </section>
            <section className="bg-white rounded-lg p-4   md:col-span-6 md:row-span-2 md:col-start-7 md:row-start-4">
                <SavingsResultCard targetAmount={targetAmount} TotalMonthExpense={TotalMonthExpense} />
            </section>

            <footer className="bg-gray-100  flex items-center justify-center  md:col-span-12 md:row-start-6">
                <p className="text-center  text-gray-600 text-sm">&copy; 2025 Monthly Tracker — All rights reserved.</p>
            </footer>
        </section>

    )
}

export default MonthlyTracker