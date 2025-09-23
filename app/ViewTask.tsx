import Icon from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function ViewTask() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Finish This To Do List", completed: false },
    { id: "2", title: "Finish Setting Theme", completed: false },
    { id: "3", title: "Finish Calendar Integration", completed: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newItem: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
    setModalVisible(false);
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
            <Text
              style={[styles.taskText, item.completed && styles.taskTextCompleted]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ➕ Add Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* 📌 Add Task Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={newTask}
              onChangeText={setNewTask}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.addTaskButton]}
                onPress={addTask}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16, color: "#753704ff" },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  completedTask: { backgroundColor: "#f8f9fa" },
  taskText: { fontSize: 18, marginLeft: 12, color: "#333" },
  taskTextCompleted: { textDecorationLine: "line-through", color: "#999" },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#753704ff",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: { backgroundColor: "#ccc" },
  addTaskButton: { backgroundColor: "#753704ff" },
  modalButtonText: { color: "#fff", fontWeight: "600" },
});
