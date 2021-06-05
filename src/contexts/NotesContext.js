import React, { useEffect, useReducer, createContext } from "react";
import uuid from "react-uuid";

export const NotesContext = createContext();

const noteReducer = (state, action) => {
	switch (action.type) {
		case "createNote":
			return {
				...state,
				notes: [
					{
						id: uuid(),
						title: "Untitled Note",
						text: "Enter the Text...",
						modifiedDate: new Date().toDateString(),
						isSelected: false,
					},
					...state.notes,
				],
				note: {},
			};
		case "readNote":
			const getNote = state.notes.filter((n) => n.id === action.payload);
			return { ...state, note: { ...getNote[0], isSelected: true } };
		case "editNote":
			const name = action.payload.e.target.name;
			const value = action.payload.e.target.value;
			const editedNote = { ...state.note, [name]: value };
			const updatedNotes = state.notes.map((n) => {
				if (n.id === action.payload.id) {
					return { ...editedNote };
				}
				return n;
			});
			return { ...state, note: editedNote, notes: updatedNotes };
		case "saveNote":
			const newNote = {...state.note, title: state.note.title || "", text: state.note.text || "", id: uuid(), modifiedDate: new Date().toDateString(), isSelected: false};
			const newSavedNotes = [newNote, ...state.notes];
			return {...state, notes: newSavedNotes};
		case "deleteNote":
			const newNotes = state.notes.filter((n) => n.id !== action.payload);
			return { ...state, notes: newNotes, note: {} };
		case "searchNote":
			const searchQuery = action.payload.target.value;
			if (searchQuery) {
				const queryNotes = state.notes.filter((n) => {
					if (n.title.toLowerCase().indexOf(searchQuery) !== -1) {
						return n;
					}
				});
				return { ...state, isSearching: true, queryNotes: queryNotes };
			} else {
				return { ...state, isSearching: false, queryNotes: [] };
			}
		case "setNotesOnLoad":
			if (localStorage.getItem("notes") !== null) {
				const parsedNotes = JSON.parse(localStorage.getItem("notes"));
				return { ...state, notes: parsedNotes };
			} else {
				return { ...state };
			}
		case "setNotesOnChange":
			const stringifiedNotes = JSON.stringify(state.notes);
			localStorage.setItem("notes", stringifiedNotes);
			return { ...state };
		default:
			throw new Error("Action doesn't exist!");
	}
};

const NotesProvider = (props) => {
	const [state, dispatch] = useReducer(noteReducer, {
		notes: [],
		note: {
			id: "",
			title: "",
			text: "",
			modifiedDate: "",
			isSelected: "",
		},
		isSearching: false,
		queryNotes: [],
	});

	useEffect(() => {
		dispatch({ type: "setNotesOnLoad" });
	}, []);

	useEffect(() => {
		dispatch({ type: "setNotesOnChange" });
	}, [state.notes]);

	const value = { state, dispatch };

	return <NotesContext.Provider value={value}>{props.children}</NotesContext.Provider>;
};

export default NotesProvider;
