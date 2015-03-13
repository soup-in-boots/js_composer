define('JSComposer/Instance/BooleanInstance', ['JSComposer/Instance', 'JSComposer/Instance/SelectInstance'], function(Instance, SelectInstance) {
    function BooleanInstance(context, parent, schema, value) {
        schema.enum = {"true":"True","false":"False"};
        value = value === true ? "true" : "false";
        SelectInstance.call(this, context, parent, schema, value);
    }

    BooleanInstance.prototype = new SelectInstance();
    BooleanInstance.prototype.constructor = BooleanInstance;

    BooleanInstance.prototype.GetValue = function() {
        var v = SelectInstance.prototype.GetValue.call(this);
        return v === "true" ? true : false;
    }

    Instance.RegisterInstance('boolean', BooleanInstance);
    return BooleanInstance;
});
