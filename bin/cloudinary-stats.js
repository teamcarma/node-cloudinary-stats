#!/usr/bin/env node


var Args = require('arg-parser'),
    CloudinaryStats = require("../index");

var args = new Args('cloudinary-stats', '1.0', '', '');

args.add({ name: 'cloud_name', desc: 'The cloudinary cloud_name', switches: [ '--cloud_name'], value: "string" });
args.add({ name: 'api_key', desc: 'The cloudinary api_key', switches: [ '--api_key'], value: "string" });
args.add({ name: 'api_secret', desc: 'The cloudinary api_secret', switches: [ '--api_secret'], value: "string" });
args.add({ name: 'tag', desc: 'The cloudinary resources tag', switches: [ '--tag'], value: "string" });

if (!args.parse()) {
    process.exit(1);
}

var stats = new CloudinaryStats({
    cloud_name: args.params.cloud_name,
    api_key: args.params.api_key,
    api_secret: args.params.api_secret,
});

stats.getDiskUsage(args.params.tag)
.catch(function(e){

    argv.help();
    console.log(e);

});