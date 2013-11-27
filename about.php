<html>
	<?php include 'views/header.html'; ?>
	<?php include 'views/topnav.html'; ?>

	<div class="divCoord"></div>

	<script>
		$(document).mousemove(function(e) {
    		$('#divCoord').html('X:' + e.pageX + ' Y:' + e.pageY);
		});
	</script>


	<?php include 'views/footer.html'; ?>

</html>
