$(document).ready(function() {
	// Set header and box width based on the size of the video
	$("header").css('width', width - 10);
	$(".box").css('width', width - 10);

	// Set header values
	$("#title").html(title);
	$("#episode_name").html(titles[season - 1][episode - 1]);

	// Set mode button to initial value
	$("#mode").html("Theater Mode");

	// Set quick jump values
	$("#season_to").val(season);
	$("#episode_to").val(episode);

	// Set current number available
	set_available();

	// Set video attributes (initial source, width, height)
	var src = get_source();
	$("#video source").attr('src', video_location + src);
	$("#video").attr('width', width);
	$("#video").attr('height', height);
	$("#video").load(); // Load the video into the player

	// When "next" button is pushed
	$("#next").on("click", function() {
		// If we've reached the last episode in the season, increment seasons if another season exists
		if ((episode == titles[season - 1].length) && (season != titles.length)) {
			episode = 0; // One less so the next if/then puts the correct episode in
			season++;
		}

		if (episode < titles[season - 1].length) {
			episode++;
			set_video();
			set_available();
		}
	});

	// When "previous" button is pushed
	$("#previous").on("click", function() {
		// If we've reached the first episode and there are more seasons ahead of it
		if ((episode - 1 == 0) && (season - 1 != 0)) {
			season--;
			episode = titles[season - 1].length + 1; // One up so the next if/then puts the correct episode in
		}

		if (episode > 1) {
			episode--;
			set_video();
			set_available();
		}
	});

	// Change modes when "mode" button is pushed
	$("#mode").on("click", function() {
		if(mode) {
			mode = false;
			$("#mode").html("Normal Mode");
			$("body").addClass("theater_body");
			$("#video").attr('width', width * 2);
			$("#video").attr('height', height * 2);
			$(".buttons, header").css("background-color", "#444");
		}
		else {
			mode = true;
			$("#mode").html("Theater Mode");
			$("body").removeClass("theater_body");
			$("#video").attr('width', width);
			$("#video").attr('height', height);
			$(".buttons, header").css("background-color", "");
		}
	});

	$("#submit_quick_jump").on("click", function() {
		var to_episode = $("#episode_to").val();
		var to_season = $("#season_to").val();

		if (to_season <= titles.length && to_season > 0) {
			if (to_episode <= titles[to_season - 1].length && to_episode > 0) {
				season = to_season;
				episode = to_episode;
				set_available();
				set_video();
			}
			else {
				alert(to_episode + " is not a valid episode.\nThere is(are) " + titles[to_season - 1].length + " episodes(s) in that season.");
				$("#episode_to").val(episode);
				$("#season_to").val(season);
			}
		}
		else {
			alert(to_season + " is not a valid season.\nThere is(are) " + titles.length + " season(s) in this series.");
			$("#episode_to").val(episode);
			$("#season_to").val(season);
		}
	});

	function set_available() {
		$("#available").html("There is(are) " + titles.length + " season(s) available. There is(are) " + titles[season - 1].length + " episode(s) available in the current season.");
	}

	// Sets the video player up
	function set_video() {
		$("#season_to").val(season);
		$("#episode_to").val(episode);
		var src = get_source();
		$("#title").html(title);
		$("#episode_name").html(titles[season - 1][episode - 1]);
		$("#video source").attr('src', video_location + src);
		$("#video").load();
		document.getElementById("video").play();
	}

	// Gets the name of the video to be played
	//	returns nameS##E##.extension
	function get_source() {
		var source = name + "S";
		
		if (season < 10)
			source += "0" + season;
		else
			source += season;

		source += "E";

		if (episode < 10)
			source += "0" + episode;
		else
			source += episode;

		source += "." + extension;
		return source;
	}
});
