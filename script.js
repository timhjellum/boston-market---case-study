(function () {
	var media = document.getElementById("bmCompare");
	if (!media) return;
	var after = media.querySelector(".compare-after");
	var handle = media.querySelector(".compare-handle");
	var dragging = false;

	function setPct(pct) {
		pct = Math.max(0, Math.min(100, pct));
		after.style.clipPath = "inset(0 0 0 " + pct + "%)";
		handle.style.left = pct + "%";
		media.setAttribute("aria-valuenow", Math.round(pct));
	}
	function pctFromEvent(e) {
		var rect = media.getBoundingClientRect();
		var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
		return (x / rect.width) * 100;
	}
	function onDown(e) {
		dragging = true;
		setPct(pctFromEvent(e));
		media.setPointerCapture &&
			e.pointerId != null &&
			media.setPointerCapture(e.pointerId);
	}
	function onMove(e) {
		if (!dragging) return;
		setPct(pctFromEvent(e));
	}
	function onUp() {
		dragging = false;
	}

	media.addEventListener("pointerdown", onDown);
	media.addEventListener("pointermove", onMove);
	media.addEventListener("pointerup", onUp);
	media.addEventListener("pointercancel", onUp);
	media.addEventListener("keydown", function (e) {
		var current = parseFloat(media.getAttribute("aria-valuenow")) || 50;
		if (e.key === "ArrowLeft") {
			setPct(current - 5);
			e.preventDefault();
		}
		if (e.key === "ArrowRight") {
			setPct(current + 5);
			e.preventDefault();
		}
	});

	setPct(50);
})();
