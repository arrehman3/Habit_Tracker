import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habit-tracker-data");
    if (savedHabits) {
      return JSON.parse(savedHabits);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("habit-tracker-data", JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (habitName) => {
    const newHabit = {
      id: Date.now().toString(),
      name: habitName,
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  };

  return (
    <>
      <section>
        <h1>Habit Tracker</h1>
      </section>
    </>
  );
}

export default App;
