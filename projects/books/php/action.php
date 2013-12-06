<?php
	
	function save($username, $isbn) {
		$conn = new MongoClient();
		$db = $conn->books;
		$col = $db->userBooks;
		$entry = array("name" => $username, "isbn" => $isbn);
		$col->insert($entry);
		$conn->close();
	}

	function getBooks($username, &$isbn_array) {
		$conn = new MongoClient();
		$db = $conn->books;
		$query = "db.userBooks.find({name:\"emma\"},{_id:0, isbn:1})";
		$isbn_array = $db->execute($query);
		$conn->close();
	} 
?>