#!/usr/bin/env node


var Args = require('arg-parser'),
    CloudinaryStats = require("../index");

var args = new Args('cloudinary-stats', '1.0', '', '');

args.add({ name: 'cloud_name', desc: 'The cloudinary cloud_name', switches: [ '--cloud_name'], value: "string" });
args.add({ name: 'api_key', desc: 'The cloudinary api_key', switches: [ '--api_key'], value: "string" });
args.add({ name: 'api_secret', desc: 'The cloudinary api_secret', switches: [ '--api_secret'], value: "string" });
args.add({ name: 'tag', desc: 'The cloudinary resources tag', switches: [ '--tag'], value: "string" });
args.add({ name: 'maxPages', desc: 'The maximum number of cloudinary resources pages', switches: [ '--maxPages'], value: "number" });
args.add({ name: 'format', desc: 'Comma separated list of fields', switches: [ '--format'], value: "string" });

if (!args.parse()) {
    process.exit(1);
}

process.stdout.on('error', function( err ) {
    if (err.code == "EPIPE") {
        process.exit(0);
    }
});

var stats = new CloudinaryStats({
    cloud_name: args.params.cloud_name,
    api_key: args.params.api_key,
    api_secret: args.params.api_secret,
});

stats.ls(args.params.tag, {
    maxPages: args.params.maxPages,
    format: args.params.format
})
.catch(function(e){

    argv.help();
    console.log(e);

});