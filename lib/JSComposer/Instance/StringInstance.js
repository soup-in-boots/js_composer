define('JSComposer/Instance/StringInstance', ['JSComposer/Utils', 'JSComposer/Instance'], function(Utils, Instance) {
    function StringInstance(context, parent, schema, value) {
        var s = this;
        schema = Utils.ldef(schema, {});
        Instance.apply(this, arguments);
        this.is_big = Utils.ldef(schema.big, false);
        if (this.is_big) {
            this.elements.text  = Utils.makeElement('textarea', {});
            Utils.applyClass(this.elements.ctr, "big");
        } else {
            this.elements.text = Utils.makeElement('input', {'type':'text', 'className':'form-control'});
        }
        this.elements.text.value = Utils.ldef(value, '');
        Utils.attachEvent(this.elements.text, 'change', function() { s.OnChange(); });
    }

    StringInstance.prototype = new Instance();
    StringInstance.prototype.constructor = StringInstance;

    StringInstance.prototype.Render = function(target) {
        this.elements.ctr = this.elements.text;
        target.appendChild(this.elements.ctr);
    }

    StringInstance.prototype.GetValue = function() {
        return this.elements.text.value;
    }

    Instance.RegisterInstance('string', StringInstance);

    return StringInstance;
});
