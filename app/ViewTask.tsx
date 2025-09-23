import Icon from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function ViewTask() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Buy groceries", completed: false },
    { id: "2", title: "Finish React Native project", completed: true },
    { id: "3", title: "Call mom", completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskItem, item.completed && styles.completedTask]}
            onPress={() => toggleTask(item.id)}
          >
            <Icon
              name={item.completed ? "check-circle" : "circle"}
              size={22}
              color={item.completed ? "#28a745" : "#999"}
            />
            <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    color: "#753704ff",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  completedTask: {
    backgroundColor: "#f8f9fa",
  },
  taskText: {
    fontSize: 18,
    marginLeft: 12,
    color: "#333",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
