<?php
	
	require_once('inc/inc.php');

	function getValue(&$book, $value, &$result) {
		$default = "";
		if (isset($book["items"][0]["volumeInfo"][$value])) {
			$default = $book["items"][0]["volumeInfo"][$value];
		}
		$result[$value] = $default;
		return $default;
	}


	function getImage(&$book, $value, &$result) {
		$default = "";
		if (isset($book["items"][0]["volumeInfo"]["imageLinks"][$value])) {
			$default = $book["items"][0]["volumeInfo"]["imageLinks"][$value];
		}
		$result[$value] = $default;
		return $default;
	}

	function getArray(&$book, $value, &$result) {
		$arr = array();
		if (isset($book["items"][0]["volumeInfo"][$value])) {
			foreach ($book["items"][0]["volumeInfo"][$value] as $i) {
				array_push($arr, $i);
			}
		}
		$result[$value] = $arr;
		return $arr;
	}

	$google_query = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
	$json_only = false;

	if(!isset($_GET["isbn"]) or trim($_GET["isbn"]) === '') {
		echo "<p>Please enter an ISBN</p></br>";
		echo "<a href=\"../\">Back</a>";
		die();
	}
	if (isset($_GET["format"])) {
		if ($_GET["format"] == "json") {
			$json_only = true;
		}
		else {
			echo "<p>Format not recognized</p></br>";
			echo "<a href=\"../\">Back</a>";
			die();
		}
	}
	$isbn = $_GET["isbn"];
	logger($isbn);
	$json = file_get_contents($google_query . $isbn);
	$book  = json_decode($json, true);

	$result = array();

	$title = getValue($book, "title", $result);
	$subtitle = getValue($book, "subtitle", $result);
	$authors = getArray($book, "authors", $result);
	$categories = getArray($book, "categories", $result);
	$publisher = getValue($book, "publisher", $result);
	$date = getValue($book, "publishedDate", $result);
	$description = getValue($book, "description", $result);
	$pageCount = getValue($book, "pageCount", $result);
	$printType = getValue($book, "printType", $result);
	$rating = getValue($book, "averageRating", $result);
	$thumbnail = getImage($book, "thumbnail", $result);

	$result_json = json_encode($result);
	if ($json_only) {
		echo $result_json;
		die();
	}

	include('info.php');

	// TODO
		// -- Provide to templates to present in a nice way
		// -- Set up user/group profiles with password 
		// -- Save isbn entries saved for each user
?>
