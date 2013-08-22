if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.BooleanField = (function() {
    function BooleanField(type_desc, value) {
        type_desc.options = {"true":"True","false":"False"};
        type_desc.allow_null = false;
        value = value === true ? "true" : "false";
        JSComposer.SelectField.call(this, type_desc, value);
    }

    BooleanField.prototype = new JSComposer.SelectField();
    BooleanField.prototype.constructor = BooleanField;

    BooleanField.prototype.GetValue = function() {
        var v = JSComposer.SelectField.prototype.GetValue.call(this);
        return v === "true" ? true : false;
    }

    JSComposer.Field.RegisterField('boolean', BooleanField);
    return BooleanField;
}());
