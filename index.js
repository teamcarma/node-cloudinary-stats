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
var getResourcesByTag = function(tag, options){

    var dfd = Q.defer();

    try {
        cloudinary.api.resources_by_tag(tag, function(list){
            dfd.resolve(list);
        }, _.extend({
            cloud_name: options.cloud_name,
            api_key: options.api_key,
            api_secret: options.api_secret
        }, options));
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

        /**
         *
         * Get disk usage.
         *
         * @param  {Object} options
         * @return {Promise}
         */
        getDiskUsage: function(tag, options){

            var size = 0;

            /// recursive call to resources
            var recursiveCalculateResourcesSize = function(size, next_cursor){

                options = _.extend({}, options, { next_cursor: next_cursor }, cOptions);

                return getResourcesByTag(tag, options).then(function(r){

                    r = _.extend({ resources: [] }, r);

                    var pageSize = _.reduce(r.resources, function(total, item) { return total + item.bytes; }, 0),
                        total = pageSize + size;

                     console.log(pageSize);

                    if(!pageSize) {
                        return total;
                    }

                    recursiveCalculateResourcesSize(total, r.next_cursor);

                });

            };

            return recursiveCalculateResourcesSize(0);

        }

    };


};

module.exports = CloudinaryStats;