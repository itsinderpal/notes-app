import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import Search from "./Search";

const Sidebar = () => {
	const { state, dispatch } = useContext(NotesContext);

	const {note, notes, queryNotes, isSearching} = state;

	const renderNotes = isSearching ? queryNotes : notes;

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h1 className="sidebar-header-title">Notes</h1>
				<button
					className="sidebar-header-add-button"
					onClick={() => dispatch({ type: "createNote" })}
				>
					Add Note
				</button>
				<Search />
			</div>
			<div className="sidebar-notes">
				{
					renderNotes.length > 0 ? (renderNotes.map((note) => {
					const { id, title, text, modifiedDate, isSelected } = note;
					return (
						<div
							key={id}
							className={`sidebar-note ${isSelected ? "sidebar-note-focus" : ""}`}
							onClick={() => dispatch({ type: "readNote", payload: id })}
						>
							<h3 className="sidebar-note-heading">
								{title.length > 50 ? title.slice(0, 50) + "..." : title}
							</h3>
							<p className="sidebar-note-text">
								{text.length > 100 ? text.slice(0, 100) + "..." : text}
							</p>
							<p className="sidebar-note-modified-date">{modifiedDate}</p>
							<button
								className="sidebar-note-delete-button"
								onClick={() => dispatch({ type: "deleteNote", payload: id })}
							>
								Delete
							</button>
						</div>
					);})) : <h2 className="sidebar-notes-empty">No Notes</h2>
				}
			</div>
		</div>
	);
};

export default Sidebar;
