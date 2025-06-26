import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import React, { useState } from 'react'
import { Button } from '../components/ui/button'

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

const GetExpenses = ({ handleExpense = () => { }, handleSubmit = () => { }, expense = {} }) => {
    const fields = [
        { name: 'title', value: expense?.title, placeholder: 'for expense title', },
        { name: 'description', value: expense?.description, placeholder: 'Add your expese description', },
        { name: 'amount', type: "number", value: expense?.amount, placeholder: 'Enter Amount', }
    ]
    return (
        <Card className="col-span-1 border-none md:col-span-6 md:col-start-7 md:row-start-2">
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

const MonthlyTracker = () => {
    const [expenses, setExpenses] = useState([])
    const [expense, setExpense] = useState({ title: '', description: '', amount: 0, date: '' })
    const handleExpense = (e) => {
        const { name, value } = e.target;
        setExpense(pre => ({ ...pre, [name]: value, date: new Date() }))
    }

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
            <header className="bg-blue-100 rounded-lg p-4 shadow md:col-span-12">
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

            <article className="bg-white border rounded-lg p-4 shadow  md:col-span-6 md:row-span-2 md:row-start-2">
                <h2 className="text-xl font-semibold mb-2">2. Overview</h2>
                <p className="text-sm text-gray-600">This section gives a summary of your monthly activity.</p>
                <GetExpenses
                    handleExpense={handleExpense}
                    handleSubmit={handleSubmit}
                    expense={expense} />
            </article>

            <article className="bg-white rounded-lg p-4 shadow border md:col-span-6 md:row-span-2 md:col-start-7 md:row-start-2">
                <h2 className="text-xl font-semibold mb-2">3. Insights</h2>
                <p className="text-sm text-gray-600">See trends and progress for better decisions.</p>
            </article>
            <section className="bg-white rounded-lg p-4 shadow border md:col-span-6 md:row-span-2 md:row-start-4">
                {expenses.map((expense, index) => (
                    <ExpensesList {...expense} key={index} />
                ))}

            </section>
            <section className="bg-white rounded-lg p-4 shadow border md:col-span-6 md:row-span-2 md:col-start-7 md:row-start-4">
                <h2 className="text-xl font-semibold mb-2">5. Reminders</h2>
                <p className="text-sm text-gray-600">Don’t forget important dates and deadlines.</p>
            </section>

            <footer className="bg-gray-100 rounded-lg p-4 shadow md:col-span-12 md:row-start-6">
                <p className="text-center text-gray-600 text-sm">&copy; 2025 Monthly Tracker — All rights reserved.</p>
            </footer>
        </section>

    )
}

export default MonthlyTracker