//var Instance   = require('Instance'),
//    JSComposer.Utils   = require('JSComposer.Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.StaticInstance = (function() {
    function StaticInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);

        var text_content = JSComposer.Utils.ldef(this.title, value, '');
        this.elements.text = JSComposer.Utils.makeElement("div", {"className": "value field"});
        JSComposer.Utils.setText(this.elements.text, text_content);

        this.value = value;
    };

    StaticInstance.prototype = new JSComposer.Instance();
    StaticInstance.prototype.constructor = StaticInstance;

    StaticInstance.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    };

    StaticInstance.prototype.GetValue = function() {
        return this.value;
    }

    JSComposer.Instance.RegisterInstance(JSComposer.Schema.URI('#/definitions/label'), StaticInstance);

    return StaticInstance;
}());
