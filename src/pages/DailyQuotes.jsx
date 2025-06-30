// components/SemanticLayout.tsx
import { Copy, Home, Moon, Star, Sun } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { cn } from "../lib/utils";

const Header = ({ theme = 'light' }) => {

    // const { setTheme, theme } = useTheme();
    return (
        <header className="col-span-5   ">
            <Card className={"border-none shadow-none "}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Left: Logo */}
                        <div className="text-lg font-bold rounded-full bg-white px-4 py-2 shadow text-center min-w-[100px]">
                            LOGO
                        </div>

                        {/* Right: Dark mode toggle + profile */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                            // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>

                            {/* Profile icon */}
                            <div className="w-8 h-8 bg-white rounded-full border shadow" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </header>
    );
}
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
        { id: "favorite", label: "Favorite", icon: <Star className="h-5 w-5" /> },
    ];

    return (
        <nav className="col-span-5 md:col-span-1 md:row-start-2 md:row-span-4">
            <Card className="h-full">
                <CardContent className="p-2 h-full flex md:flex-col flex-row md:justify-start justify-around items-center gap-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={activeTab === item.id ? "default" : "ghost"}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 ${activeTab === item.id ? "shadow" : ""
                                }`}
                        >
                            {item.icon}
                            <span className="hidden md:inline">{item.label}</span>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </nav>
    );
}

const RecentQuotes = ({ title = '', addFev = () => { }, stayStared = false }) => {
    const [stared, setStared] = useState(stayStared)
    const handleFev = () => {
        addFev()
        if (stayStared) return
        setStared(pre => !pre)
    }
    return (
        <Card
            className={cn(
                "bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
                "rounded-2xl p-4 shadow-sm transition-all duration-300 mb-3 border border-transparent hover:shadow-lg",
                stared ? "border-green-500 ring-2 ring-green-300 dark:ring-green-600" : ""
            )}
        >
            <CardContent className="flex items-center justify-between gap-4 p-3 group">
                <div className="flex-1 text-start">
                    <h3
                        className={cn(
                            "text-xl font-semibold transition-colors duration-300",
                            "text-gray-900 dark:text-white",
                            stared ? "text-green-700 dark:text-green-300" : ""
                        )}
                    >
                        {title}
                    </h3>
                </div>

                <div className="text-right">
                    <button onClick={handleFev} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <Star
                            className={cn(
                                "h-6 w-6 transition-colors duration-300",
                                stared ? "text-green-600 fill-green-500" : "text-gray-400 group-hover:text-yellow-400"
                            )}
                        />
                    </button>
                </div>
            </CardContent>
        </Card>

    )
}

export default function DailyQoutes() {
    const [fevItems, setFevItems] = useState([])
    const [quotes, setQuotes] = useState({ id: 20, title: 'The only limit to our realization of tomorrow is our doubts of today', fav: false })
    const [stared, setStared] = useState(false)
    const [fev, setFev] = useState(false)

    const [copied, setCopied] = useState(false)
    const recentQuotes = [
        // { id: 1, title: "The only limit to our realization of tomorrow is our doubts of today." },
        { id: 2, title: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
        { id: 3, title: "Don't watch the clock; do what it does. Keep going." },
        { id: 4, title: "Believe you can and you're halfway there." },
        { id: 5, title: "It always seems impossible until it's done." }
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(quotes?.title || '')
        } catch (error) {
            console.log("you god clipboard err", error)
        } finally {
            setCopied(true)
        }


    }
    const handleFev = (item) => {
        if (!(item?.title && item.id)) return;

        setFevItems(prev => {
            const index = prev.findIndex(obj => obj.id === item.id);

            // Show feedback once
            setFev(true);
            setTimeout(() => {
                setFev(false);
            }, 3000);

            if (index !== -1) {
                // Toggle fav if item exists
                return prev.map(obj =>
                    obj.id === item.id ? { ...obj, fav: !obj.fav } : obj
                );
            } else {
                // Add new item with fav true
                return [...prev, { ...item, fav: true }];
            }
        });
    };


    return (
        <div className="grid gap-2 px-2 md:grid-cols-5 ">
            {/* Header */}
            <Header />

            {/* Sidebar nav – visible on all screens */}
            <Sidebar />

            {/* Main content */}
            <main className="col-span-5 md:col-span-4 md:col-start-2  ">
                <Card
                    className={cn(
                        "bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
                        "rounded-2xl p-4 shadow-sm transition-all duration-300 mb-3 border",
                        stared ? "border-green-500 ring-1 ring-green-400/60 dark:ring-green-500/40" : "border-transparent",
                        "hover:shadow-md"
                    )}
                >
                    <CardContent className="flex flex-col gap-4 p-3">
                        {/* Title */}
                        <h3
                            className={cn(
                                "text-xl font-semibold transition-colors",
                                "text-gray-900 dark:text-white",
                                stared ? "text-green-700 dark:text-green-300" : ""
                            )}
                        >
                            {quotes.title}
                        </h3>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            {/* Favorite Button */}
                            <button
                                onClick={() => handleFev(quotes)}
                                className={cn(
                                    "p-2 rounded-full flex items-center gap-2 border border-gray-300 dark:border-gray-700",
                                    "hover:bg-green-50 dark:hover:bg-green-800/30",
                                    "transition text-sm",
                                    fev && "bg-green-100 dark:bg-green-700/20"
                                )}
                            >
                                <Star className={cn("h-5 w-5", fev ? "text-green-600 fill-green-500" : "text-gray-500")} />
                                <span className="hidden sm:inline">{fev ? "Favorited" : "Add to Fav"}</span>
                            </button>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                className={cn(
                                    "p-2 rounded-full cursor-pointer flex items-center gap-2 border border-gray-300 dark:border-gray-700",
                                    "hover:bg-blue-50 dark:hover:bg-blue-800/30",
                                    "transition text-sm"
                                )}
                            >
                                <Copy className="h-5 w-5 text-blue-600" />
                                <span className="hidden sm:inline">{copied ? "copied" : "copy"}</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Articles section */}
            <section className="col-span-5 md:col-span-2 md:col-start-2 md:row-start-4 md:row-span-2">
                <article>
                    <Card>
                        <p className="text-xl font-bold">Top Recent Qoutes </p>
                        <CardContent className="p-4">
                            {recentQuotes?.slice(0, 9)?.map(({ title, id }) => (<RecentQuotes title={title} key={id} addFev={() => handleFev({ title, id })} />))}
                        </CardContent>
                    </Card>
                </article>
            </section>

            <section className="col-span-5 md:col-span-2 md:col-start-4 md:row-start-4 md:row-span-2">
                <article>
                    <Card>
                        <p className="text-xl font-bold">Top Recent Fevorted Qoutes </p>
                        {fevItems?.slice(0, 9)?.map(({ title, id }) => (<RecentQuotes title={title} key={id} addFev={() => handleFev({ title, id })} stayStared={true} />))}
                    </Card>
                </article>
            </section>
        </div>

    );
}
