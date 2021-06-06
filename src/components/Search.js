import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

const Search = () => {
	const { dispatch } = useContext(NotesContext);
	return (
		<div className="sidebar-header-search">
			<input
				type="text"
				name="search"
				className="sidebar-header-search-input"
				placeholder="Search Note..."
				onChange={(e) => dispatch({ type: "searchNote", payload: e })}
				autoComplete="off"
			/>
		</div>
	);
};

export default Search;
