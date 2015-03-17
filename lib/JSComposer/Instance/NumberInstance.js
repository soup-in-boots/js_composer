define('JSComposer/Instance/NumberInstance', ['JSComposer/Utils', 'JSComposer/Instance'], function(Utils, Instance) {
    function NumberInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        this.elements.input = Utils.makeElement('input', {'className':'form-control'});
        var $self = this;
        value = Utils.ldef(value, 0.0);
        this.key_regex = new RegExp('[^0-9\.\-]');
        this.minimum_distance = this.exclusiveMinimum === true ? 0.000001 : 0;
        this.maximum_distance = this.exclusiveMaximum === true ? 0.000001 : 0;
        Utils.attachEvent(this.elements.input, 'keypress', function() { return $self.OnKeyDown.apply($self, arguments); });
        Utils.attachEvent(this.elements.input, 'change', function() { return $self.OnChange.apply($self, arguments); });

        this.SetValue(value);
    }

    NumberInstance.prototype = new Instance();
    NumberInstance.prototype.constructor = NumberInstance;

    NumberInstance.prototype.Render = function(target) {
//        this.elements.ctr.appendChild(this.elements.input);
        this.elements.ctr = this.elements.input;
        target.appendChild(this.elements.ctr);
    };

    NumberInstance.prototype.GetValue = function() {
        return parseFloat(this.elements.input.value);
    };

    NumberInstance.prototype.OnKeyDown = function(e) {
        console.log("Keypress detected:",this,'::',this.key_regex,'::',e);
        return OnKeyDown(e, this.key_regex);
    }

    NumberInstance.prototype.OnChange = function() {
        this.SetValue(this.elements.input.value);
    }

    NumberInstance.prototype.SetValue = function(value) {
        console.log("Forming Value: ", value);
        if (typeof this.minimum !== undefined &&
            value < this.minimum + this.minimum_distance) {
            value = this.minimum + this.minimum_distance;
        }

        if (typeof this.maximum !== undefined &&
            value > this.maximum - this.minimum_distance) {
            value = this.maximum - this.maximum_distance;
        }
        console.log("Value Formed: ", value);

        this.elements.input.value = value;
    }

    function OnKeyDown(e, rx) {
        var v = String.fromCharCode(e.keyCode);
        var r = true;

        if (v.match(rx)) {
            console.log("MATCH");
            e.cancelBubble = true;
            if (e.preventDefault) e.preventDefault();
            r = false;
        }

        return r;
    };

    Instance.RegisterInstance('number', NumberInstance);

    return NumberInstance;
});
