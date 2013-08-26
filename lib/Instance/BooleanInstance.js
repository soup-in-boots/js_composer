if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.BooleanInstance = (function() {
    function BooleanInstance(schema, value) {
        schema.options = {"true":"True","false":"False"};
        schema.allow_null = false;
        value = value === true ? "true" : "false";
        JSComposer.SelectInstance.call(this, schema, value);
    }

    BooleanInstance.prototype = new JSComposer.SelectInstance();
    BooleanInstance.prototype.constructor = BooleanInstance;

    BooleanInstance.prototype.GetValue = function() {
        var v = JSComposer.SelectInstance.prototype.GetValue.call(this);
        return v === "true" ? true : false;
    }

    JSComposer.Instance.RegisterInstance('boolean', BooleanInstance);
    return BooleanInstance;
}());
