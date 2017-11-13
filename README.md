#  Java Sparrow

**Production Server Branch**: [![Build Status](https://travis-ci.org/deSagaz/java-sparrow.svg?branch=prod-server)](https://travis-ci.org/deSagaz/java-sparrow)

Assess your javascript knowledge with sparrow-swiftness!

## Production server branch

This repository contains a Heroku / Amazon S3 version of the server software, which is suitable for production.

### Deployment
First login to Heroku and create an application according to Heroku's documentation. You can fork our repository if you would like to make custom adjustments, or you can directly link to our production version (which you will need to manually push as well if changes occur).

To deploy to Heroku, run the following command in the main folder: `git subtree push --prefix javasparrow-server/ heroku master`. This ensures that only the server is uploaded to Heroku; the client should be hosted elsewhere.

To set up Amazon S3, you can follow [these instructions](https://www.caktusgroup.com/blog/2014/11/10/Using-Amazon-S3-to-store-your-Django-sites-static-and-media-files/). Make sure to set the Environment variables in Heroku that are indicated in the `settings.py` file (such as your own secret key, and Amazon storage location).

If you run into any trouble, feel free to contact us!

## Documentation

For a full overview of event types and their possibilities, please visit [this wiki page](https://github.com/deSagaz/java-sparrow/wiki/Sequence-of-events).

## Contribute

If you wish to contribute to Java-Sparrow: awesome! :smile: We currently do not have a contributors document, but feel free to contact the authors if you're looking for ways to improve the software.
