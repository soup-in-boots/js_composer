define('JSComposer/Instance/PasswordInstance', ['JSComposer/Instance', 'JSComposer/Instance/StringInstance'], function(Instance, StringInstance) {
    function PasswordInstance(schema, value) {
        StringInstance.apply(this, arguments);

        this.elements.text.type = "password";
        this.elements.text.value = "";
    }

    PasswordInstance.prototype = new StringInstance();
    PasswordInstance.prototype.constructor = PasswordInstance;

    Instance.RegisterInstance('password', PasswordInstance);

    return PasswordInstance;
});
