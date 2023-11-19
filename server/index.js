const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes //
app.get("/", (req, res) => {
	res.send({
		"Get all todos": "http://localhost:5000/todos",
		"Get particular todo": "http://localhost:5000/todos/1"
	});
	//log("You can use following url to get the data");
});
// Create
app.post("/todos", async (req, res) => {
	try {
		const { desc } = req.body;
		const strQuery =
			"INSERT INTO todo (description) VALUES('" + desc + "') RETURNING *";
		const newTodo = await pool.query(strQuery);

		res.json(newTodo.rows[0]);
		// console.log(req.body);
		// res.send("Welcome, " + req.body.desc);
	} catch (err) {
		console.error(err.message);
	}
});

// Read all
app.get("/todos", async (req, res) => {
	try {
		const strQuery = "select * from todo";
		const allTodos = await pool.query(strQuery);

		res.status(200).json(allTodos.rows);
		// console.log(req.body);
		// res.send("Welcome, " + req.body.desc);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.error(err.message);
	}
});

// Read one
app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const strQuery = "SELECT * FROM todo WHERE id = " + id;
		const todo = await pool.query(strQuery);

		res.json(todo.rows[0]);
		// console.log(req.body);
		// res.send("Welcome, " + req.body.desc);
	} catch (err) {
		console.error(err.message);
	}
});

// Update
app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { desc } = req.body;

		//const strQuery = "UPDATE todo SET description =$1 WHERE id = $2";
		const updateTodo = await pool.query(
			"UPDATE todo SET description =$1 WHERE id = $2 RETURNING *",
			[desc, id]
		);

		res.json(updateTodo.rows[0]);
		// console.log(req.body);
		// res.send("Welcome, " + req.body.desc);
	} catch (err) {
		console.error(err.message);
	}
});

// Delete
app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deleteTodo = await pool.query(
			"DELETE FROM todo WHERE id = $1 RETURNING *",
			[id]
		);

		res.json(deleteTodo.rows[0]);
		// console.log(req.body);
		// res.send("Welcome, " + req.body.desc);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/health", (req, res) => {
	try {
		//check for db connection
		pool.query("SELECT NOW()", (err, res) => {
			if (err) {
				console.error(err.message);
				res.status(500).json({ error: err.message });
			} else {
				console.log("DB connected");
			}
		});

		//specify health check for options

		res.status(200).json({ message: "Server is up and running" });

	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: err.message });
	}

});

app.listen(5000, () => {
	console.log("Server has started on port 5000");
}); 
