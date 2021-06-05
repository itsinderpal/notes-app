import React, { useContext } from 'react'
import {NotesContext} from "../contexts/NotesContext";

const Note = () => {

	const {state, dispatch} = useContext(NotesContext);
	const {id, title, text} = state.note;

    return (
			<div className="note">
				<div className="note-header">
					<h2 className="note-header-title">Note Controls</h2>
					<button className="note-header-save-button" onClick={() => dispatch({type: "saveNote"})}>Save</button>
				</div>
				<div className="note-edit">
					<input
						type="text"
						name="title"
						className="note-edit-title"
						placeholder="Untitled Note"
						autoComplete="off"
						value={title || ""}
						onChange={(e) => dispatch({ type: "editNote", payload: { e, id } })}
					/>
					<textarea
						name="text"
						className="note-edit-text"
						placeholder="Enter the Text..."
						value={text || ""}
						onChange={(e) => dispatch({ type: "editNote", payload: { e, id } })}
					></textarea>
				</div>
			</div>
		);
}

export default Note
