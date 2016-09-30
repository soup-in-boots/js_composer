define('JSComposer/Instance/SelectInstance', ['JSComposer/Utils', 'JSComposer/Instance'], function(Utils, Instance) {
    function SelectInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        var $self = this;
        // Convert list options into object options

        if (typeof this['enum'] === 'object' &&
            typeof this['enum'].length !== 'undefined') {
            var o = {};
            for (var i = 0, l = this['enum'].length; i < l; ++i) {
                o[this['enum'][i]] = this['enum'][i];
            }
            this['enum'] = o;
        } else if (typeof this['enum'] === 'undefined') {
            this['enum'] = {};
        }

        this.allow_null = this['enum'].hasOwnProperty('null');
        this.elements.select = Utils.makeSelect(this['enum'], this.allow_null);
        Utils.applyClass(this.elements.select, 'form-control');
        Utils.attachEvent(this.elements.select, 'change', function() { $self.OnChange(); });
        Utils.setSelectValue(this.elements.select, value);

        this.value = Utils.getSelectValue(this.elements.select);
        this.prevValue = undefined;
    }

    SelectInstance.prototype = new Instance();
    SelectInstance.prototype.constructor = SelectInstance;

    SelectInstance.prototype.GetValue = function() {
        return Utils.getSelectValue(this.elements.select);
    };

    SelectInstance.prototype.Render = function(target) {
//        this.elements.ctr.appendChild(this.elements.select);
        this.elements.ctr = this.elements.select;
        target.appendChild(this.elements.ctr);
    }

    SelectInstance.prototype.SetOptions = function(options) {
        Utils.setSelectOptions(this.elements.select, this.allow_null, options);
    }

    SelectInstance.prototype.OnChange = function() {
        this.prevValue = this.value;
        this.value = Utils.getSelectValue(this.elements.select);
    }

    Instance.RegisterInstance('enum', SelectInstance);

    return SelectInstance;
});
