if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.PasswordInstance = (function() {
    function PasswordInstance(schema, value) {
        JSComposer.StringInstance.apply(this, arguments);

        this.elements.text.type = "password";
        this.elements.text.value = "";
    }

    PasswordInstance.prototype = new JSComposer.StringInstance();
    PasswordInstance.prototype.constructor = PasswordInstance;

    JSComposer.Instance.RegisterInstance('password', PasswordInstance);
}());
