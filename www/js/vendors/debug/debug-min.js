window.log = function () {
    log.history.push(arguments);
    if (this.console) {
        arguments = Array.prototype.slice.call(arguments, 0);
        console.log.apply(console, arguments);
	  }
};
window.log.history = log.history || [];
if (!window.console) {
    window.firebug = document.createElement("script");
    firebug.setAttribute("src", "js/vendors/firebug-lite-min.js");
    document.body.appendChild(firebug);
    (function () {
        if (window.firebug.version) {
            firebug.env.debug = false;
            firebug.init();
        } else {
            setTimeout(arguments.callee);
        }
    })()
}
