define('JSComposer/Instance/OfInstance', ['JSComposer/Utils', 'JSComposer/Instance', 'JSComposer/Entry'], function(Utils, Instance, Entry) {
    if (typeof window.JSComposer === 'undefined') window.JSComposer = {};

    function OneOfInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);

        this.options = this.GetOptions();
        var $self = this,
            type = undefined,
            option = undefined;

        if (typeof value !== 'undefined') {
            for (var i = 0, l = this.oneOf.length; i < l; ++i) {
                if (tv4.validate(value, this.oneOf[i])) {
                    type = this.oneOf[i];
                    option = i;
                    break;
                }
            }
        }

        if (typeof type === 'undefined') {
            type = this.oneOf[0];
            option = 0;
        }

        Utils.applyClass(this.elements.ctr, 'entry');
        Utils.removeClass(this.elements.ctr, 'panel');
        Utils.removeClass(this.elements.ctr, 'panel-default');
        this.entry = new Entry(this.context, this, {'enum':this.options}, type, option.toString(), value);
        this.entry.OnKeyChange = Utils.appendFunction(this.entry.OnKeyChange, function() { $self.OnKeyChange(); });
    }

    OneOfInstance.prototype = new Instance();
    OneOfInstance.prototype.constructor = OneOfInstance;
    Object.defineProperty(OneOfInstance.prototype, 'super', Instance);

    OneOfInstance.prototype.Render = function(target) {
        this.entry.Render(this.elements.ctr);
        Instance.prototype.Render.call(this, target);
    };

    OneOfInstance.prototype.OnKeyChange = function() {
        var key = this.entry.GetKey(),
            schema = this.oneOf[key];

        this.entry.SetValueSchema(schema, this.entry.GetValue());
    }

    OneOfInstance.prototype.GetOptions = function() {
        var options = {},
            l = this.oneOf.length,
            i = 0;

        for (; i < l; ++i) {
            var s = this.oneOf[i];
            options[i] = Utils.ldef(s.title, s.id, s.type, i);
        }

        return options;
    }

    OneOfInstance.prototype.GetValue = function() {
        return this.entry.GetValue();
    }

    Instance.RegisterInstance('oneOf',  OneOfInstance);

    return OneOfInstance;
});
