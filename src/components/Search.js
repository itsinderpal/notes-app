import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

const Search = () => {
	const { state, dispatch } = useContext(NotesContext);
	return (
		<div className="sidebar-header-search">
			<input
				type="text"
				name="search"
				className="sidebar-header-search-input"
				placeholder="Search Note..."
				onChange={(e) => dispatch({ type: "searchNote", payload: e })}
			/>
		</div>
	);
};

export default Search;
