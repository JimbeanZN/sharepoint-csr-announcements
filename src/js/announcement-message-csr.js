(function () {
	document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"><\/script>');
	document.write('<script src="/Style%20Library/AnnouncementCSR/announcement-message.min.js"><\/script>');
	document.write('<link rel="stylesheet" type="text/css" href="/Style%20Library/AnnouncementCSR/announcement-message.min.css" />');
	
	/* 
	* Initialize the variable that store the overrides objects. 
	*/
	var overrideCtx = {};
	overrideCtx.Templates = {};

	//	Assign functions or plain html strings to the templateset objects:
	//	header, footer and item. 
	overrideCtx.Templates.Header = "<div class='center'>"; overrideCtx.Templates.Footer = "</div>";
	
	// 	This template is assigned to the CustomItem function. 
	overrideCtx.Templates.Item = CustomItem;
	overrideCtx.BaseViewID = 1; 
	overrideCtx.ListTemplateType = 104;

	// Register the template overrides. 
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();
	
/* 
* This function builds the output for the item template. 
* Uses the Context object to access announcement data. 
*/
function CustomItem(ctx) {
	// Build a listitem entry for every announcement in the list.
	/* 
		<div class="notification fail canhide"><span>ERROR!</span> This is an error message.</div>
		<div class="notification info canhide"><span>INFORMATION:</span> This is an information.</div>
		<div class="notification warning canhide"><span>WARNING!</span> This is a warning message.</div>
	*/

	if (ctx.CurrentItem["MessageType"] == "Informational (blue)") {
		return "<div class='notification info'>" + ctx.CurrentItem["Body"].replace("<p>", "").replace("</p>", "") + "</div>";
	} else if (ctx.CurrentItem["MessageType"] == "Warning (yellow)") {
		return "<div class='notification warning'>" + ctx.CurrentItem["Body"].replace("<p>", "").replace("</p>", "") + "</div>";
	} else if (ctx.CurrentItem["MessageType"] == "Critical (red)") {
		return "<div class='notification fail'>" + ctx.CurrentItem["Body"].replace("<p>", "").replace("</p>", "") + "</div>";
	}

	return "<li>This is a " + ctx.CurrentItem.MoreText + "</li>";
}