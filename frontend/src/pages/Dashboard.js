import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/");
      return;
    }

    setUser(userData ? JSON.parse(userData) : null);
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes] = await Promise.all([
        axios.get("http://localhost:5000/api/projects"),
        axios.get("http://localhost:5000/api/tasks")
      ]);

      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setError("");
    } catch (err) {
      setError("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const addProject = async () => {
    if (!newProject.trim()) {
      setError("Project title is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/projects", {
        title: newProject,
        description: newProjectDesc
      });

      setProjects([...projects, res.data]);
      setNewProject("");
      setNewProjectDesc("");
    } catch (err) {
      setError("Error creating project");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title: newTask,
        status: "Pending"
      });

      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      setError("Error creating task");
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: newStatus }
      );

      setTasks(tasks.map(t => t._id === taskId ? res.data : t));
    } catch (err) {
      setError("Error updating task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      setError("Error deleting task");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
      setProjects(projects.filter(p => p._id !== projectId));
    } catch (err) {
      setError("Error deleting project");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Team Project Management</h1>
        <div>
          <span>Welcome, {user?.name}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="content">
        {/* Projects Section */}
        <div className="section">
          <h2>Projects</h2>
          <div className="input-group">
            <input
              placeholder="Project title"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <input
              placeholder="Description (optional)"
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
            />
            <button onClick={addProject}>Add Project</button>
          </div>

          <div className="list">
            {projects.length === 0 ? (
              <p>No projects yet. Create one to get started!</p>
            ) : (
              projects.map(project => (
                <div key={project._id} className="item">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <button onClick={() => deleteProject(project._id)} className="delete-btn">Delete</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="section">
          <h2>Tasks</h2>
          <div className="input-group">
            <input
              placeholder="Task title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <div className="list">
            {tasks.length === 0 ? (
              <p>No tasks yet. Create one to get started!</p>
            ) : (
              tasks.map(task => (
                <div key={task._id} className="item">
                  <div>
                    <h3>{task.title}</h3>
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
