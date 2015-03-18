define('JSComposer/Schema', ['JSComposer/Utils', 'tv4'], function(Utils, tv4) {
    if (typeof window.JSComposer === 'undefined') { window.JSComposer = {}; }
    var schema = {
        "$schema":"http://json-schema.org/draft-04/schema#",
        "id":"http://jscomposer.net/schema/jscomposer#",
        "definitions":{
            'label':{'type':'string'}
        }
    };

    var loaded = [];

    LoadRawSchema(schema);

    function URI(fragment, uri) {
        uri = Utils.ldef(uri, schema.id);
        if (uri.match(/#/) === null) {
            uri = uri + '#';
        }
        uri = uri.replace(/#/, fragment);
        return uri
    }
    function Ref(fragment, uri) {
        uri = URI(fragment, uri);
        if (tv4.getSchema(uri) === undefined) {
            throw 'invalid_uri';
        }
        return {'$ref':uri};
    }

    function LoadRawSchema(uri, schema) {
        loaded[uri] = schema;
        tv4.addSchema(uri, schema);
    }

    function LoadSchema(uri) {
        // 1. Handle already loaded case
        if (uri.match(/#$/) === null) {
            uri = uri + "#";
        }
        if (tv4.getSchema(uri) !== undefined) { return; }

        // Cheap and easy XMLHttpRequest integration for the moment
        // TODO: Something more resilient. Schemas should be rechecked
        // periodically (if requested).
        var http = new XMLHttpRequest();
        http.open("GET", uri, false);
        http.send(null);

        var parsed = JSON.parse(http.responseText);

        if (parsed.id !== undefined) {
            LoadRawSchema(parsed.id, parsed);
        }

        LoadRawSchema(uri, parsed);
    };

    function FetchSchema(uri) {
        var m       = uri.match(/^[^#]*#/);

        if (m == null) {
            throw({'error':'bad_schema_uri','uri':uri});
        }

        LoadSchema(m[0]);
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
