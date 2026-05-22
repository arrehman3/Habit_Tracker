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
  const [newHabitName, setNewHabitName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (newHabitName.trim() == "") return;
    handleAddHabit(newHabitName);
    setNewHabitName("");
  };

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
  const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);
  return (
    <>
      <section>
        <h1>Habit Tracker</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Enter a new habit..."
          />
          <button type="submit">Add Habit</button>
        </form>
      </section>
    </>
  );
}

export default App;
