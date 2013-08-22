if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.NumberField = (function() {
    function NumberField(type_desc, value) {
        var self = this;
        value = JSComposer.Utils.ldef(value, 0);
        JSComposer.TextField.apply(this, arguments);
        JSComposer.Utils.attachEvent(self.elements.text, 'keypress', function() { var r = self.OnKeyDown.apply(self, arguments); console.log("## Returning: ", r); return r; });
    }

    NumberField.prototype = new JSComposer.TextField();
    NumberField.prototype.constructor = NumberField;

    NumberField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.number);
        target.appendChild(this.elements.ctr);
    };

    NumberField.prototype.GetValue = function() {
        return parseInt(this.elements.number.value);
    };

    NumberField.prototype.OnKeyDown = function(e) {
        return OnKeyDown(e, /[^0-9\.]/);
    }

    function OnKeyDown(e, rx) {
        var v = String.fromCharCode(e.keyCode);
        var r = true;

        if (v.match(rx)) {
            e.cancelBubble = true;
            r = false;
        }

        return r;
    };

    JSComposer.Field.RegisterField('number', NumberField);

    return NumberField;
}());
