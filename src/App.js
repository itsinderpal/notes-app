import React from "react";
import Note from "./components/Note";
import Sidebar from "./components/Sidebar";
import "./styles/main.css"
import NotesProvider from "./contexts/NotesContext";

const App = () => {
	return (
		<NotesProvider>
			<div className="app">
				<Sidebar />
				<Note />
			</div>
		</NotesProvider>
	);
};

export default App;
