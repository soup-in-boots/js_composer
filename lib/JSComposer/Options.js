define('JSComposer/Options', [], function() {
    var options = new Map();

    function set(option, value) {
        console.log("[JSComposer/Options] Setting option", option, "to", value);
        options.set(option, value);
    }

    function get(option, defaultValue) {
        var value = options.get(option);

        if (typeof value === undefined)
            value = defaultValue;

        return value;
    }

    var exports = {};
    function defineOption(name, defaultValue) {
        exports[name] = function(value) {
            if (typeof value !== 'undefined') {
                return set(name, value);
            } else {
                return get(name, defaultValue);
            }
        }
    }

    defineOption('allowAdditionalProperties', true);
    defineOption('alwaysRenderOptional', false);
    defineOption('emptyStringsAsNull', false);

    console.log("[JSComposer/Options] Defined options:", exports);
    return exports;
});
