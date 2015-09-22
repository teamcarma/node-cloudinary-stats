# Cloudinary stats

*Supported by*:

[![Carma](https://raw.githubusercontent.com/teamcarma/node-python-runner-web/master/assets/banner.png)](https://carmacarpool.com/)

Provides command line utilities to manage your cloudinary resources.


```

npm i cloudinary-utils -g

# list resources information
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX

# list resources information by tag
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX --tag=XXXX

# list resources information by tag
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX --tag=XXXX

```
## cloudinary-ls

List your cloudinary resources

```

# list resources information
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX

# list resources information by tag
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX --tag=XXXX

# format the resources result
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX --format="public_id,format,secure_url"

```

Usage:

```

usage: cloudinary-ls [options]

 --api_key=STRING      The cloudinary api_key
 --api_secret=STRING   The cloudinary api_secret
 --cloud_name=STRING   The cloudinary cloud_name
 --format=STRING       Comma separated list of fields
 --maxPages=NUMBER     The maximum number of cloudinary resources pages
 --tag=STRING          The cloudinary resources tag
 -h, --help            display help & usage
 -v, --version         display cli name & version

```

## cloudinary-rm

Removes the given cloudinary resource.

```

# removes all development resources ( from dev tag )
cloudinary-ls --cloud_name=XXX --api_key=XXX --api_secret=XXX --format="public_id" --maxPages=1 --tag=dev | cloudinary-rm --cloud_name=XXX --api_key=XXX --api_secret=XXX

```

## Authors

* [Oscar Brito](https://twitter.com/aetheon)

