import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

type Task = {
  id: string;
  title: string;
  date: string; // format: YYYY-MM-DD
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [tasks] = useState<Task[]>([
    { id: "1", title: "Finish To-Do List", date: "2025-09-24" },
    { id: "2", title: "Plan UI Theme", date: "2025-09-25" },
    { id: "3", title: "Integrate Calendar", date: "2025-09-25" },
  ]);

  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Calendar</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: "#753704ff" },
        }}
        theme={{
          todayTextColor: "#753704ff",
          arrowColor: "#753704ff",
        }}
      />

      <Text style={styles.subtitle}>
        {selectedDate ? `Tasks on ${selectedDate}` : "Select a date"}
      </Text>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>• {item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    color: "#753704ff",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 12,
    color: "#444",
  },
  taskItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
});

