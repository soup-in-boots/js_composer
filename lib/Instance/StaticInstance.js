//var Instance   = require('Instance'),
//    JSComposer.Utils   = require('JSComposer.Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.StaticInstance = (function() {
    function StaticInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);

        var text_content = JSComposer.Utils.ldef(this.title, value, '');
        JSComposer.Utils.setText(this.elements.ctr, text_content);

        this.value = value;
    };

    StaticInstance.prototype = new JSComposer.Instance();
    StaticInstance.prototype.constructor = StaticInstance;

    StaticInstance.prototype.GetValue = function() {
        return this.value;
    }

    JSComposer.Instance.RegisterInstance(JSComposer.Schema.URI('#/definitions/label'), StaticInstance);

    return StaticInstance;
}());
