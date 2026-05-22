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
  const toggleHabit = (habitId, dateStr) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== habitId) return habit;
        const newDates = habit.completedDates.includes(dateStr)
          ? habit.completedDates.filter((d) => d !== dateStr)
          : [...habit.completedDates, dateStr];

        return { ...habit, completedDates: newDates };
      }),
    );
  };

  const shiftWeek = (days) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + days);
    setCurrentWeekStart(newDate);
  };
  return (
    <>
      <section>
        <h1>Habit Tracker</h1>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={() => shiftWeek(-7)}>Previous Week</button>
          <button onClick={() => shiftWeek(7)}>Next Week</button>
        </div>

        <form onSubmit={onSubmit} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Enter a new habit..."
          />
          <button type="submit">Add Habit</button>
        </form>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Habit</th>
              {weekDays.map((day) => (
                <th key={day.toISOString()}>
                  {day.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                {weekDays.map((day) => {
                  // Using 'en-CA' safely formats the date as YYYY-MM-DD in the local timezone
                  const dateStr = day.toLocaleDateString("en-CA");
                  return (
                    <td key={dateStr} style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={habit.completedDates.includes(dateStr)}
                        onChange={() => toggleHabit(habit.id, dateStr)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
