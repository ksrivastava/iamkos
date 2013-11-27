<?php
	function logger($msg) {
		$file = "logs/log";
		$fh = fopen($file, "a") or die("can't open file");
		$str = "[" . date("Y/m/d h:i:s", mktime()) . "] " . $msg;
		fwrite($fh, $str . "\n");
		fclose($fh);
	}
?>