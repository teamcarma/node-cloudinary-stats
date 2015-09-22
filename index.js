"use strict";

var _           = require("lodash"),
    Q           = require("q"),
    cloudinary  = require("cloudinary");


/**
 *
 * Get resources that have been tagged by the given argument
 *
 * @param  {String} tag
 * @param  {Object} options
 * @return {Promise}
 *
 */
var getResources = function(tag, options){

    var dfd = Q.defer();

    var getter = tag ? cloudinary.api.resources_by_tag : cloudinary.api.resources,
        args = tag ? [tag] : [];

    try {

        args = args.concat(function(list){

            if(list.error){
                dfd.reject(list.error);
                return;
            }

            dfd.resolve(list);

        });

        args = args.concat(_.extend({
            cloud_name: options.cloud_name,
            api_key: options.api_key,
            api_secret: options.api_secret,
            max_results: 100,
            tags: true
        }, options));

        getter.apply({}, args);

    }
    catch(e){
        dfd.reject(e);
    }

    return dfd.promise;

};

/**
 *
 * Cloudinary stats operations
 * @class
 *
 * @type {Object} cOptions
 *
 */
var CloudinaryStats = function(cOptions){

    return {

        ls: function(tag, options){

            options.maxPages = options.maxPages || 999999;

            var currentPage = 0;

            /// recursive call to resources
            var recursiveCalculateResourcesSize = function(size, next_cursor){

                var rOptions = _.extend({}, options, cOptions, { next_cursor: next_cursor });

                return getResources(tag, rOptions).then(function(r){

                    r = _.extend({ resources: [] }, r);
                    var pageSize = 0;

                    _.each(r.resources, function(resource){

                        if(!options.format){
                            console.log(
                            _.map(_.keys(resource), function(field){
                                return field + ":" + resource[field];
                            }).join("\t"));
                        }
                        else {
                            console.log(
                                _.map(options.format.split(","), function(field){
                                    return resource[field];
                                }).join("\t"));
                        }

                        pageSize += resource.bytes;

                    });

                    return _.extend(r, { pageSize: pageSize })

                })
                .then(function(r){

                    size = r.pageSize + size;
                    currentPage++;

                    if(currentPage < options.maxPages && r.next_cursor){
                        return recursiveCalculateResourcesSize(size, r.next_cursor);
                    }

                    /// if a format is specified ignore the totals
                    if(options.format){
                        return;
                    }

                    console.log("\n");
                    console.log([
                        "Pages",
                        currentPage
                    ].join("\t"));

                    console.log([
                        "Size",
                        size
                    ].join("\t"));


                });

            };

            return recursiveCalculateResourcesSize(0);

        },

        rm: function(id){

            var dfd = Q.defer();

            cloudinary.api.delete_resources(id, function(r){

                console.log(r)
                if(r.error){
                    dfd.reject(r.error);
                    return;
                }

                dfd.resolve(r);

            }, {
                cloud_name: cOptions.cloud_name,
                api_key: cOptions.api_key,
                api_secret: cOptions.api_secret,
            });

            return dfd.promise;

        }



    };


};

module.exports = CloudinaryStats;