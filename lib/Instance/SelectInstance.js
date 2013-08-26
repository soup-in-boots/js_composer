if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.SelectInstance = (function() {
    function SelectInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
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
        this.elements.select = JSComposer.Utils.makeSelect(this['enum'], this.allow_null);
        JSComposer.Utils.attachEvent(this.elements.select, 'change', function() { $self.OnChange(); });
        JSComposer.Utils.setSelectValue(this.elements.select, value);

        this.currValue = JSComposer.Utils.getSelectValue(this.elements.select);
        this.prevValue = undefined;
    }

    SelectInstance.prototype = new JSComposer.Instance();
    SelectInstance.prototype.constructor = SelectInstance;

    SelectInstance.prototype.GetValue = function() {
        return JSComposer.Utils.getSelectValue(this.elements.select);
    };

    SelectInstance.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.select);
        target.appendChild(this.elements.ctr);
    }

    SelectInstance.prototype.SetOptions = function(options) {
        JSComposer.Utils.setSelectOptions(this.elements.select, this.allow_null, options);
    }

    SelectInstance.prototype.OnChange = function() {
        this.prevValue = this.currValue;
        this.currValue = JSComposer.Utils.getSelectValue(this.elements.select);
    }

    JSComposer.Instance.RegisterInstance('enum', SelectInstance);

    return SelectInstance;
}());
