import Icon from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  StatusBar,
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
  createdAt: number;
};

export default function ViewTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);

  // Load tasks from storage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks", error);
      }
    };
    if (!loading) {
      saveTasks();
    }
  }, [tasks, loading]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      Alert.alert("Validation Error", "Task cannot be empty");
      return;
    }
    const newItem: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
    setModalVisible(false);
  };

  const deleteTask = (id: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => setTasks(tasks.filter(task => task.id !== id)) }
      ]
    );
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setEditModalVisible(true);
  };

  const saveEditedTask = () => {
    if (!editingTask || editingTask.title.trim() === "") {
      Alert.alert("Validation Error", "Task cannot be empty");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...editingTask, title: editingTask.title.trim() } : task
      )
    );
    setEditModalVisible(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const clearCompleted = () => {
    Alert.alert(
      "Clear Completed",
      "Are you sure you want to delete all completed tasks?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => setTasks(tasks.filter(task => !task.completed)) }
      ]
    );
  };

  const getActiveCount = () => tasks.filter(task => !task.completed).length;

  const getCompletedCount = () => tasks.filter(task => task.completed).length;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {getActiveCount()} active, {getCompletedCount()} completed
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "active" && styles.activeFilter]}
          onPress={() => setFilter("active")}
        >
          <Text style={[styles.filterText, filter === "active" && styles.activeFilterText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "completed" && styles.activeFilter]}
          onPress={() => setFilter("completed")}
        >
          <Text style={[styles.filterText, filter === "completed" && styles.activeFilterText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.completed && styles.completedTask]}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.taskCheckbox}>
              <Icon
                name={item.completed ? "check-circle" : "circle"}
                size={24}
                color={item.completed ? "#28a745" : "#999"}
              />
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.taskTextCompleted,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.taskDate}>{formatDate(item.createdAt)}</Text>
            </View>
            <View style={styles.taskActions}>
              <TouchableOpacity onPress={() => startEditing(item)} style={styles.actionButton}>
                <Icon name="edit-2" size={18} color="#753704" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.actionButton}>
                <Icon name="trash-2" size={18} color="#dc3545" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {filter === "all" 
                ? "No tasks yet. Add one to get started!" 
                : filter === "active" 
                  ? "No active tasks" 
                  : "No completed tasks"}
            </Text>
          </View>
        }
      />

      {/* Clear Completed Button */}
      {getCompletedCount() > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearCompleted}>
          <Text style={styles.clearButtonText}>Clear Completed</Text>
        </TouchableOpacity>
      )}

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={newTask}
              onChangeText={setNewTask}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNewTask("");
                }}
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

      {/* Edit Task Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={editingTask?.title || ""}
              onChangeText={(text) => editingTask && setEditingTask({...editingTask, title: text})}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingTask(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.addTaskButton]}
                onPress={saveEditedTask}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8f9fa", 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#753704",
  },
  statsContainer: {
    marginTop: 5,
  },
  statsText: {
    fontSize: 14,
    color: "#666",
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f1f3f5",
  },
  activeFilter: {
    backgroundColor: "#753704",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  completedTask: { backgroundColor: "#f8f9fa" },
  taskCheckbox: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskText: { 
    fontSize: 16, 
    color: "#333",
  },
  taskTextCompleted: { 
    textDecorationLine: "line-through", 
    color: "#999" 
  },
  taskDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  taskActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
  clearButton: {
    margin: 20,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  clearButtonText: {
    color: "#dc3545",
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#753704",
    padding: 16,
    borderRadius: 8,
    margin: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "flex-end" 
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: { 
    backgroundColor: "#e9ecef" 
  },
  addTaskButton: { 
    backgroundColor: "#753704" 
  },
  modalButtonText: { 
    color: "#fff", 
    fontWeight: "600" 
  },
});