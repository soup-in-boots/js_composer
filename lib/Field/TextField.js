if (window.JSComposer === undefined) window.JSComposer = {};

JSComposer.TextField = (function(){
    function TextField(type_desc, value) {
        var s = this;
        type_desc = JSComposer.Utils.ldef(type_desc, {});
        JSComposer.Field.apply(this, arguments);
        this.is_big = JSComposer.Utils.ldef(type_desc.big, false);
        if (this.is_big) {
            this.elements.text  = JSComposer.Utils.makeElement('textarea', {});
            JSComposer.Utils.applyClass(this.elements.ctr, "big");
        } else {
            this.elements.text = JSComposer.Utils.makeElement('input', {'type':'text'});
        }
        this.elements.text.value = JSComposer.Utils.ldef(value, '');
        JSComposer.Utils.attachEvent(this.elements.text, 'change', function() { s.OnChange(); });
    }

    TextField.prototype = new JSComposer.Field();
    TextField.prototype.constructor = TextField;

    TextField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    }

    TextField.prototype.GetValue = function() {
        return this.elements.text.value;
    }

    JSComposer.Field.RegisterField('text', TextField);

    return TextField;
}());
