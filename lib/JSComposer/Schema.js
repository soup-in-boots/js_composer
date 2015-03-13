define('JSComposer/Schema', ['JSComposer/Utils', 'tv4'], function(Utils) {
    if (typeof window.JSComposer === 'undefined') { window.JSComposer = {}; }
    var schema = {
        "$schema":"http://json-schema.org/draft-04/schema#",
        "id":"http://jscomposer.net/schema/jscomposer#",
        "definitions":{
            'label':{'type':'string'}
        }
    };

    tv4.addSchema(schema.id, schema);

    function URI(fragment, uri) {
        uri = Utils.ldef(uri, schema.id);
        uri = uri.replace(/#/, fragment);
        return uri
    }
    function Ref(fragment, uri) {
        uri = URI(fragment, uri);
        if (tv4.getSchema(uri) === undefined) {
            console.log('[Schema.Ref]', 'Invalid URI/Fragment: ', uri, '::', fragment);
            throw 'invalid_uri';
        }
        return {'$ref':uri};
    }

    function LoadRawSchema(uri, schema) {
        tv4.addSchema(uri, schema);
    }

    function LoadSchema(uri) {
        // 1. Handle already loaded case
        if (uri.match(/#$/) === null) {
            uri = uri + "#";
        }
        if (tv4.getSchema(uri) !== undefined) { return; }

        var http    = new XMLHttpRequest();
        console.log("Fetching URI: ", uri);
        http.open("GET", uri, false);
        http.send(null);

        var parsed = JSON.parse(http.responseText);

        if (parsed.id !== undefined) {
            LoadRawSchema(parsed.id, parsed);
        }

        LoadRawSchema(uri, parsed);
    };

    function FetchSchema(uri) {
        return tv4.getSchema(uri);
    }

    return {
        Fetch: FetchSchema,
        Load: LoadSchema,
        LoadRaw: LoadRawSchema,
        Ref: Ref,
        URI: URI
    };
});
