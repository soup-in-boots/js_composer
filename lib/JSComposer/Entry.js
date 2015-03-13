define('JSComposer/Entry', ['JSComposer/Utils', 'JSComposer/Instance'], function(Utils, Instance) {
    function Entry(context, parent, key_desc, val_desc, key, value) {
        var s = this;
        this.context = context;
        this.parent = parent;
        this.elements = {
            'key':      Utils.makeElement('div', {'className':'key field'}),
            'value':    Utils.makeElement('div', {'className':'value field'})
        };
        this.schema = {
            'key':      key_desc,
            'value':    val_desc
        };
        //console.log("[Entry] Invoking instance: ", key, " :: ", key_desc);
        console.log("[Entry] Invoking instance: ", key, " :: ", key_desc);
        console.log("[Entry] Invoking instance: ", value, " :: ", val_desc);
        this.fields = {
            'key':      Instance.CreateInstance(context, parent, key_desc, key),
            'value':    Instance.CreateInstance(context, parent, val_desc, value)
        }

        this.fields.key.OnChange = Utils.appendFunction(this.fields.key.OnChange, function() { s.OnKeyChange(); });
        this.fields.value.OnChange = Utils.appendFunction(this.fields.value.OnChange, function() { s.OnValueChange(); });
    }

    Entry.prototype.GetKey = function() {
        return this.fields.key.GetValue();
    }

    Entry.prototype.GetKeyInstance = function() {
        return this.fields.key;
    }

    Entry.prototype.GetValue = function() {
        return this.fields.value.GetValue();
    }

    Entry.prototype.GetValueInstance = function() {
        return this.fields.value;
    }

    Entry.prototype.SetValueSchema = function(schema, value) {
        if (schema === this.schema.value) {
            return;
        }

        this.fields.value.Destroy()
        var instance = Instance.CreateInstance(this.context, this.parent, schema, value);
        instance.Render(this.elements.value);
        this.fields.value = instance;
        this.schema.value = schema;
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
});
