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
  const calculateStreak = (completedDates) => {
    let streak = 0;
    let currentDate = new Date();

    const todayStr = currentDate.toLocaleDateString("en-CA");
    if (!completedDates.includes(todayStr)) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    while (true) {
      const dateStr = currentDate.toLocaleDateString("en-CA");
      if (completedDates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };
  const handleDeleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };
  return (
    <main style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Habit Tracker</h1>

      {/* 1. Time Travel Buttons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => shiftWeek(-7)}>Previous Week</button>
        <button onClick={() => shiftWeek(7)}>Next Week</button>
      </div>

      {/* 2. Add Habit Form */}
      <form onSubmit={onSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Enter a new habit..."
        />
        <button type="submit">Add Habit</button>
      </form>

      {/* 3. The Grid Container */}
      {(() => {
        const todayStr = new Date().toLocaleDateString("en-CA");

        return (
          <div style={{ overflowX: "auto" }}>
            {" "}
            {/* 4. Makes table scrollable on mobile */}
            <table
              border="1"
              cellPadding="8"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Habit</th>
                  <th>Streak</th>
                  {weekDays.map((day) => {
                    const dateStr = day.toLocaleDateString("en-CA");
                    const isToday = dateStr === todayStr;
                    return (
                      <th
                        key={dateStr}
                        style={{
                          backgroundColor: isToday ? "#fffacd" : "transparent",
                        }}
                      >
                        {day.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {habits.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      No habits yet. Start tracking by adding one above!
                    </td>
                  </tr>
                ) : (
                  habits.map((habit) => (
                    <tr key={habit.id}>
                      <td>
                        {habit.name}
                        <button
                          onClick={() => handleDeleteHabit(habit.id)}
                          style={{
                            marginLeft: "10px",
                            fontSize: "0.8rem",
                            color: "red",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#ff4757",
                        }}
                      >
                        {calculateStreak(habit.completedDates)} 🔥
                      </td>
                      {weekDays.map((day) => {
                        const dateStr = day.toLocaleDateString("en-CA");
                        const isToday = dateStr === todayStr;
                        return (
                          <td
                            key={dateStr}
                            style={{
                              textAlign: "center",
                              backgroundColor: isToday
                                ? "#fffacd"
                                : "transparent",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={habit.completedDates.includes(dateStr)}
                              onChange={() => toggleHabit(habit.id, dateStr)}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );
      })()}
    </main>
  );
}

export default App;
