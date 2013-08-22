if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.IntegerField = (function() {

    function IntegerField(type_desc, value) {
        JSComposer.NumberField.apply(this, arguments);
    }

    IntegerField.prototype = new JSComposer.NumberField();
    IntegerField.prototype.constructor = IntegerField;

    IntegerField.prototype.OnKeyDown = function(e) {
        return OnKeyDown(e, /[^0-9]/);
    }

    JSComposer.Field.RegisterField('integer', IntegerField);
    
    return IntegerField;
}());
