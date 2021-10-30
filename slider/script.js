$(document).ready(function () {
	var owl = $(".owl-carousel");
	var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	/**
	 * Initialize Carousel with options
	 */
	owl.owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		dots: true,
		autoplay: true,
		navText: ["Prev", "Next"],
		onDragged: callback,
		onInitialized: onInitialized,
	});

	/**
	 * Listen to 'Dragged' events
	 */
	function callback() {
		console.log("Drag");
	}

	/**
	 * Listen to 'Click' events
	 */
	function onInitialized() {
		$(".owl-prev, .owl-next, .owl-dot").on("click", () => {
			console.log("Click");
		});
	}

	if (getCookie("form_filled") || getCookie("popUp_closed")) {
		$(".reset_btn").addClass("active");
	}

	/**
	 * FUNCTIONS
	 */

	const validateInputs = (e) => {
		let nameValue = $(".name").val();
		let emailValue = $(".email").val();
		let checkboxValue = $(".checkbox").is(":checked");

		if (e === "submit") {
			$(".name_error").text("");
			$(".email_error").text("");
			$(".checkbox_error").text("");

			if (nameValue === "") {
				// $(".name_error").text("Required");
			}
			if (emailValue === "") {
				$(".email_error").text("Required");
			} else if (!mailformat.test(String(emailValue).toLowerCase())) {
				$(".email_error").text("Email format is not correct");
			}
			if (!checkboxValue) {
				$(".checkbox_error").text("Required");
			}
		} else {
			if (e.target == $(".name")[0]) {
				if (nameValue === "") {
					// $(".name_error").text("Required");
				} else {
					$(".name_error").text("");
				}
			} else if (e.target == $(".email")[0]) {
				if (emailValue === "") {
					$(".email_error").text("Required");
				} else if (!mailformat.test(String(emailValue).toLowerCase())) {
					$(".email_error").text("Email format is not correct");
				} else {
					$(".email_error").text("");
				}
			} else if (e.target == $(".checkbox")[0]) {
				if (!checkboxValue) {
					$(".checkbox_error").text("Required");
				} else {
					$(".checkbox_error").text("");
				}
			}
		}
	};

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	/**
	 * EVENT LISTENERS
	 */
	window.addEventListener("beforeunload", function (e) {
		if (getCookie("form_filled") || getCookie("popUp_closed")) {
			return false;
		}

		/* Cancel the event */
		e.preventDefault();
		/* Chrome requires returnValue to be set */
		e.returnValue = "";

		$(".popup").addClass("active");
		$(".wrapper").addClass("blur");
	});

	$(".close_btn").on("click", () => {
		setCookie("popUp_closed", "true");
		$(".popup").removeClass("active");
		$(".wrapper").removeClass("blur");
		$(".reset_btn").addClass("active");
	});

	$(".reset_btn").on("click", () => {
		document.cookie = "popUp_closed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		document.cookie = "form_filled=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		$(".reset_btn").removeClass("active");
	});

	$(".email").on("keyup", validateInputs);
	$(".checkbox").on("change", validateInputs);

	$("form").on("submit", (e) => {
		e.preventDefault();
		validateInputs("submit");

		if (
			// $(".name_error").text() === "" &&
			$(".email_error").text() === "" &&
			$(".checkbox_error").text() === ""
		) {
			console.log("Submitting form...");
			console.log("Name: ", $(".name").val());
			console.log("Email: ", $(".email").val());

			setCookie("form_filled", "true");

			$(".name").val("");
			$(".email").val("");
			$(".checkbox").prop("checked", false);

			$(".reset_btn").addClass("active");
			$(".popup").removeClass("active");
			$(".wrapper").removeClass("blur");
		}
	});
});
