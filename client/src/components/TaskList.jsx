import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom'

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()

	const loadTask = async () => {
		const response = await fetch("http://localhost:3000/tasks");
		const data = await response.json();
		setTasks(data);
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`http://localhost:3000/tasks/${id}`, {
				method: "DELETE",
			});
			setTasks(tasks.filter((task) => task.id != id));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadTask();
	}, []);

	return (
		<>
			<h1 style={{ margin: "1rem 0" }}>Task List</h1>
			{tasks.map((task) => (
				<Card
					key={task.id}
					style={{
						marginBottom: ".7rem",
						backgroundColor: "#1e272e",
					}}
				>
					<CardContent
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div style={{ color: "white" }}>
							<Typography>{task.title}</Typography>
							<Typography>{task.description}</Typography>
						</div>

						<div>
							<Button
								variant="contained"
								color="inherit"
								onClick={() => navigate(`/tasks/${task.id}/edit`)}
							>
								Edit
							</Button>
							<Button
								variant="contained"
								color="warning"
								onClick={() => handleDelete(task.id)}
								style={{ marginLeft: ".5rem" }}
							>
								Delete
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	);
};
export default TaskList;
