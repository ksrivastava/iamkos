var inside_count = 0;

	function fixImage(id, image) {
		image.style.top = 5 + "px";
		var f_width = (($( window ).width() / 5) * id) - 15;
		image.style.left = f_width + "px";
	}

	function isInside(id, image) {
		var rect = image.getBoundingClientRect();
		var m_height = rect.top + rect.height/2;
		return (m_height < 160);
	}

	function moveImage(image)
	{	
		var id = image.id.substr(image.id.length - 1);
		var is_inside_before_move = isInside(id, image);

		var height = $( window ).height() - 160;
		var width = $( window ).width() - 142;
		image.style.top = (Math.random()*height) + "px";
		image.style.left= (Math.random()*width) + "px";
		
		var is_inside_after_move = isInside(id, image);
		if (is_inside_after_move) {
			fixImage(id, image);
		}
		if (!is_inside_before_move && is_inside_after_move) {
			inside_count++;
		}
		else if (is_inside_before_move && !is_inside_after_move) {
			inside_count--;
		}
		if (inside_count == 4) {
			welcome(true);
		}
		else welcome(false);
	}

	function welcome(show)
	{	
		var str = "Welcome";
		var result = str.link("/home");
		if (show) document.getElementById("welcome").innerHTML=result;
		else document.getElementById("welcome").innerHTML="";
	}