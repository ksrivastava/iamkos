<?php
	echo "<html>";
	echo "<head>";
	echo "<title>" . $result['title'] . "</title>";
	echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/style.css\">";
	echo "<body>";
	if ($thumbnail != "") {
		echo "<div id = \"thumbnail\"><img src=" . $thumbnail . "></div>";
	}
	echo "<div id = \"info\">";
	echo "<table>";
	echo "<tr><th>Key</th><th>Value</th></tr>";
	foreach ($result as $key => $value) {
		echo "<tr>";
		echo "<td>" . ucfirst($key) . "</td>";
		if (is_array($value)) {
			echo "<td>";
			for ($i=0; $i < sizeof($value); $i++) { 
				if ($i) echo ", ";
				echo $value[$i];
			}
			echo "</td>";
		}
		else {
			echo "<td>" . $value . "</td>";
		}
		echo "</tr>";
	}
	echo "</table></div>";
	echo "</body></html>";
?>