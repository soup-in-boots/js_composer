if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Entry = (function() {
    function Entry(key_desc, val_desc, key, value) {
        var s = this;
        this.elements = {
            'key':      JSComposer.Utils.makeElement('div', {'className':'key field'}),
            'value':    JSComposer.Utils.makeElement('div', {'className':'value field'})
        };
        this.fields = {
            'key':      JSComposer.Field.CreateObject(key_desc, key),
            'value':    JSComposer.Field.CreateObject(val_desc, value)
        }

        this.fields.key.OnChange = JSComposer.Utils.appendFunction(this.fields.key.OnChange, function() { s.OnKeyChange(); });
        this.fields.value.OnChange = JSComposer.Utils.appendFunction(this.fields.value.OnChange, function() { s.OnValueChange(); });
    }

    Entry.prototype.GetKey = function() {
        return this.fields.key.GetValue();
    }

    Entry.prototype.GetKeyField = function() {
        return this.fields.key;
    }

    Entry.prototype.GetValue = function() {
        return this.fields.value.GetValue();
    }

    Entry.prototype.GetValueField = function() {
        return this.fields.value;
    }

    Entry.prototype.OnKeyChange = function() {
    }

    Entry.prototype.OnValueChange = function() {
    }

    Entry.prototype.Render = function(target) {
        this.fields.key.Render(this.elements.key);
        this.fields.value.Render(this.elements.value);
        target.appendChild(this.elements.key);
        target.appendChild(this.elements.value);
    }

    return Entry;
}());
