import './App.css'
import ResponsiveArticleCard from './components/newArticalPreview'
import DailyQoutes from './pages/DailyQuotes'
import DailyStreak from './pages/DailyStreak'
import Layout from './pages/Layout'
import MonthlyTracker from './pages/MonthlyTracker'
import TaskDashboard from './pages/TaskTracker'
import WeekTrackerComponent from './pages/WeeklyTaskTracker'

function App() {

  return (
    <>
      {/* <ResponsiveArticleCard /> */}
      {/* <TaskDashboard/> */}
      {/* <DailyStreak/> */}
      {/* <MonthlyTracker/> */}
      {/* <DailyQoutes /> */}
      <Layout>
        <WeekTrackerComponent />
      </Layout>
    </>
  )
}

export default App
