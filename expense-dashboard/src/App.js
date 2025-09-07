import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [spendings, setSpendings] = useState([]);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    description: "",
    comment: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/api/spending";

  // Fetch all spendings
  useEffect(() => {
    fetchSpendings();
  }, []);

  const fetchSpendings = async () => {
    try {
      const res = await axios.get(API_URL);
      setSpendings(res.data);
    } catch (err) {
      console.error("Error fetching spendings:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ date: "", amount: "", description: "", comment: "" });
      setEditingId(null);
      fetchSpendings();
    } catch (err) {
      console.error("Error saving spending:", err);
    }
  };

  // Delete spending
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSpendings();
    } catch (err) {
      console.error("Error deleting spending:", err);
    }
  };

  // Start editing
  const handleEdit = (spending) => {
    setForm({
      date: spending.date,
      amount: spending.amount,
      description: spending.description,
      comment: spending.comment,
    });
    setEditingId(spending.id);
  };

  // Prepare chart data
  const monthlyData = spendings.reduce((acc, sp) => {
    const month = new Date(sp.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + parseFloat(sp.amount);
    return acc;
  }, {});

  const categoryData = spendings.reduce((acc, sp) => {
    const key = sp.description || "Other";
    acc[key] = (acc[key] || 0) + parseFloat(sp.amount);
    return acc;
  }, {});

  const lineData = spendings
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((sp) => ({ x: sp.date, y: sp.amount }));

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Expense Dashboard</h1>

      {/* Spending Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Comment"
            />
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Spending Table */}
      <table className="table table-bordered table-striped mb-5">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((sp) => (
            <tr key={sp.id}>
              <td>{sp.date}</td>
              <td>£{sp.amount}</td>
              <td>{sp.description}</td>
              <td>{sp.comment}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(sp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(sp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <h5>Total Spent per Month</h5>
          <Bar
            data={{
              labels: Object.keys(monthlyData),
              datasets: [
                {
                  label: "Amount (£)",
                  data: Object.values(monthlyData),
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
              ],
            }}
          />
        </div>

        <div className="col-md-6 mb-4">
          <h5>Amount per Description</h5>
          <Pie
            data={{
              labels: Object.keys(categoryData),
              datasets: [
                {
                  label: "Amount (£)",
                  data: Object.values(categoryData),
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#8AFF33",
                    "#FF8A33",
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h5>Spending Over Time</h5>
          <Line
            data={{
              labels: lineData.map((d) => d.x),
              datasets: [
                {
                  label: "Amount (£)",
                  data: lineData.map((d) => d.y),
                  fill: false,
                  borderColor: "rgba(75,192,192,1)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
