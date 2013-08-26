if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.IntegerInstance = (function() {

    function IntegerInstance(context, parent, schema, value) {
        value = JSComposer.Utils.ldef(value, schema.default, 0);
        JSComposer.NumberInstance.apply(this, arguments);

        this.key_regex = new RegExp('[^0-9\-]');
        this.minimum_distance = this.exclusiveMinum === true ? 1 : 0;
        this.maximum_distance = this.exclusiveMaxum === true ? 1 : 0;
        this.elements.input.value = value;

        this.SetValue(value);
    }

    IntegerInstance.prototype = new JSComposer.NumberInstance();
    IntegerInstance.prototype.constructor = IntegerInstance;

    IntegerInstance.prototype.GetValue = function() {
        return parseInt(this.elements.input.value);
    };

    JSComposer.Instance.RegisterInstance('integer', IntegerInstance);

    return IntegerInstance;
}());
