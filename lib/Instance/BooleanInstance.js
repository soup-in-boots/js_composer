if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.BooleanInstance = (function() {
    function BooleanInstance(context, parent, schema, value) {
        schema.enum = {"true":"True","false":"False"};
        value = value === true ? "true" : "false";
        JSComposer.SelectInstance.call(this, context, parent, schema, value);
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
