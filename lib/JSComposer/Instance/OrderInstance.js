define('JSComposer/Instance/OrderInstance', ['JSComposer/Utils', 'JSComposer/Instance', 'JSComposer/Instance/SelectInstance'], function(Utils, Instance, SelectInstance){
    function OrderInstance(schema, value) {
        schema.allow_null = false;
        console.log("ALLOW_NULL IS FALSE");
        SelectInstance.call(this, schema, value);

        var s = this;

        this.elements.select.multiple = true;
        this.elements.up_button = Utils.makeElement('div', {'className':'order button up'});
        Utils.attachEvent(this.elements.up_button, 'click', function() { s.OnUpClick(); });
        this.elements.down_button = Utils.makeElement('div', {'className':'order button down'});
        Utils.attachEvent(this.elements.down_button, 'click', function() { s.OnDownClick(); });
        Utils.applyClass(this.elements.ctr, 'big');
        Utils.applyClass(this.elements.select, 'multi');
        Utils.applyClass(this.elements.select, 'order');
        this.selected = this.elements.select.selectedIndex;
    }

    OrderInstance.prototype = new SelectInstance();
    OrderInstance.prototype.constructor = OrderInstance;

    OrderInstance.prototype.Render = function(target) {
        SelectInstance.prototype.Render.call(this, target);

        this.elements.ctr.appendChild(this.elements.up_button);
        this.elements.ctr.appendChild(this.elements.down_button);
    };

    OrderInstance.prototype.OnSelect = function() {
        var index = this.elements.select.selectedIndex;

        if (this.selected === -1) {
            this.selected = index;
        } else {
            this.elements.select.options[this.selected].selected = false;
        }
        this.selected = this.elements.select.selectedIndex;
    };

    OrderInstance.prototype.OnUpClick = function() {
        var s = this.elements.select,
            o = s.options.item(s.selectedIndex),
            t = s.options.item(s.selectedIndex - 1);

        if (t === null) return undefined;

        s.removeChild(o);
        s.insertBefore(o, t);
        o.selected = true;

        this.selected = s.selectedIndex;
        console.log("SELECTED: ", s.options);
    }

    OrderInstance.prototype.OnDownClick = function() {
        if (this.selected < 0) { return undefined; }
        var s = this.elements.select,
            o = s.options.item(s.selectedIndex),
            t = s.options.item(s.selectedIndex + 1);

        if (t === null) return undefined;

        s.removeChild(t);
        s.insertBefore(t, o);
        o.selected = true;

        this.selected = s.selectedIndex;
        console.log("SELECTED: ", s.options);
    }

    OrderInstance.prototype.GetValue = function() {
        var a = [],
            s = this.elements.select,
            i = 0,
            l = s.options.length;

        for (; i < l; ++i) {
            a.push(s.options[i].value);
        }

        return a;
    }

    Instance.RegisterInstance('order', OrderInstance);
    return OrderInstance;
});
