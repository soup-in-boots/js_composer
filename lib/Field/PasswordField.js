if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.PasswordField = (function() {
    function PasswordField(type_desc, value) {
        JSComposer.TextField.apply(this, arguments);

        this.elements.text.type = "password";
        this.elements.text.value = "";
    }

    PasswordField.prototype = new JSComposer.TextField();
    PasswordField.prototype.constructor = PasswordField;

    JSComposer.Field.RegisterField('password', PasswordField);
}());
