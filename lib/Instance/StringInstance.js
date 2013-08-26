if (window.JSComposer === undefined) window.JSComposer = {};

JSComposer.StringInstance = (function(){
    function StringInstance(context, parent, schema, value) {
        var s = this;
        schema = JSComposer.Utils.ldef(schema, {});
        JSComposer.Instance.apply(this, arguments);
        this.is_big = JSComposer.Utils.ldef(schema.big, false);
        if (this.is_big) {
            this.elements.text  = JSComposer.Utils.makeElement('textarea', {});
            JSComposer.Utils.applyClass(this.elements.ctr, "big");
        } else {
            this.elements.text = JSComposer.Utils.makeElement('input', {'type':'text'});
        }
        this.elements.text.value = JSComposer.Utils.ldef(value, '');
        JSComposer.Utils.attachEvent(this.elements.text, 'change', function() { s.OnChange(); });
    }

    StringInstance.prototype = new JSComposer.Instance();
    StringInstance.prototype.constructor = StringInstance;

    StringInstance.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    }

    StringInstance.prototype.GetValue = function() {
        return this.elements.text.value;
    }

    JSComposer.Instance.RegisterInstance('string', StringInstance);

    return StringInstance;
}());
