define('JSComposer/Instance/SelectInstance', ['JSComposer/Utils', 'JSComposer/Instance'], function(Utils, Instance) {
    function SelectInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        var $self = this;
        // Convert list options into object options

        this.enum = Utils.ldef(this.enum, []);
        this.elements.select = Utils.makeElement('select');
        value = Utils.ldef(value, this.enum[0]);
        this.InitializeOptions(this.enum.indexOf(value));

        this.currValue = Utils.getSelectValue(this.elements.select, value);
        this.prevValue = undefined;

        Utils.applyClass(this.elements.select, 'form-control');
        Utils.attachEvent(this.elements.select, 'change', function() { $self.OnChange(); });
        Utils.setSelectValue(this.elements.select, value);
    }

    SelectInstance.prototype = new Instance();
    SelectInstance.prototype.constructor = SelectInstance;

    SelectInstance.prototype.GetValue = function() {
        var index = this.elements.select.selectedIndex;
        return this.values[index];
    };

    SelectInstance.prototype.Render = function(target) {
//        this.elements.ctr.appendChild(this.elements.select);
        this.elements.ctr = this.elements.select;
        target.appendChild(this.elements.ctr);
    };

    SelectInstance.prototype.SetOptions = function(options, selected) {
        this.enum = options.slice();
        this.IntializeOptions(selected);
    };

    SelectInstance.prototype.InitializeOptions = function(selected) {
        this.values = [];
        selected = Utils.ldef(selected, 0);

        this.values = [];
        while (this.elements.select.options.length > 0) {
            this.elements.select.remove(0);
        }

        for (var i = 0; i < this.enum.length; ++i) {
            this.AddOption(this.enum[i], i);
        }

        this.elements.select.selectedIndex = selected;
    }

    SelectInstance.prototype.AddOption = function(value, index) {
        var title = this.makeTitle(value);
        index = Utils.ldef(index, this.values.length);
        var option = Utils.makeElement('option', {'text': title, 'value': index.toString()});

        this.values.splice(index, 0, value);
        this.elements.select.add(option, index);
    };

    SelectInstance.prototype.RemoveOption = function(value) {
        var index = this.values.indexOf(index);
        if (index < 0) return;

        this.elements.select.remove(index);
        this.values.splice(index, 1);
    }

    SelectInstance.prototype.makeTitle = function(value) {
        var r = undefined;

        switch (typeof value) {
            case 'undefined':
                r = "UNDEFINED";
                break;
            case 'object':
                if (value == null) {
                    r = 'NULL';
                } else {
                    var n = ++this.object_count;
                    r = 'Object ' + n.toString();
                }
                break;
            default:
                r = value.toString();
                break;
        }

        return r;
    }

    SelectInstance.prototype.OnChange = function() {
        this.prevValue = this.currValue;
        this.currValue = Utils.getSelectValue(this.elements.select);
    };

    Instance.RegisterInstance('enum', SelectInstance);

    return SelectInstance;
});
