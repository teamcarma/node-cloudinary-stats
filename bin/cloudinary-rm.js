#!/usr/bin/env node


var Args = require('arg-parser'),
    CloudinaryStats = require("../index");

var args = new Args('cloudinary-stats', '1.0', '', '');

args.add({ name: 'cloud_name', desc: 'The cloudinary cloud_name', switches: [ '--cloud_name'], value: "string" });
args.add({ name: 'api_key', desc: 'The cloudinary api_key', switches: [ '--api_key'], value: "string" });
args.add({ name: 'api_secret', desc: 'The cloudinary api_secret', switches: [ '--api_secret'], value: "string" });
args.add({ name: 'id', desc: 'The cloudinary resources tag', switches: [ '--tag'], value: "string" });

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

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function( data ) {

    var ids = data.split("\n").join(",");

    stats.rm(ids)
    .then(function(){

        console.log([
            "Deleted",
            ids ].join("\t"));

    })
    .catch(function(e){
        argv.help();
        console.log(e);
        process.exit(1);
    });

});

// stats.rm(args.params.id, {
//     maxPages: args.params.maxPages
// })
// .catch(function(e){

//     argv.help();
//     console.log(e);

// });