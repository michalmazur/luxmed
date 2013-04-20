/*
 * Every time you log in to the Patient Portal to make an appointment you are asked to confirm your contact information by clicking "Confirm".
 * As soon as the confirmation popup is loaded this script programmatically clicks the "Confirm" button.
 */

 var main = function() {
 
	// Wait up to 5 seconds for the popup to load.
	var max_load_time = 5000;
	
	// Check if the popup has been loaded every 50 ms.
	var frequency = 50;
	
	interval = setInterval(function() { dismissPopup(max_load_time/frequency) }, frequency);

	/*
	 * check_limit determines how many times this function will check
	 * if the popup has been loaded before canceling checking.
	 * Prevents inifinite checking if AcceptUserDataFormSubmit is renamed.
	 */
	function dismissPopup(check_limit) {
		if (typeof dismissPopup.counter == 'undefined') {
			dismissPopup.counter = 0;
		}
		
		if (dismissPopup.counter >= check_limit) {
			clearInterval(interval);
			return;
		}
		
		var confirmButton = $('form[name=acceptUserDataForm] .button:not(#AcceptCancel)');
		if (confirmButton.length === 1) {
			$('.ui-dialog').hide();
			$('.ui-widget-overlay').hide();
			clearInterval(interval);
			confirmButton.trigger('click');
		}
		
		dismissPopup.counter++;
	}
};



var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
