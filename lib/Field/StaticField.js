//var Field   = require('Field'),
//    JSComposer.Utils   = require('JSComposer.Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.StaticField = (function() {
    function StaticField(type_desc, value) {
        JSComposer.Field.apply(this, arguments);

        var text_content = JSComposer.Utils.ldef(this.type_desc.text, value, '');
        this.elements.text = JSComposer.Utils.makeElement("div", {"className": "value field"});
        JSComposer.Utils.setText(this.elements.text, text_content);

        this.value = value;
    };

    StaticField.prototype = new JSComposer.Field();
    StaticField.prototype.constructor = StaticField;

    StaticField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    };

    StaticField.prototype.GetValue = function() {
        return this.value;
    }

    JSComposer.Field.RegisterField('static', StaticField);

    return StaticField;
}());
