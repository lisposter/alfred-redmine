# alfred-redmine


------

## Installation

* Make sure you have nodejs in your Mac.
* Download binary from [Releases](https://github.com/lisposter/alfred-redmine/releases)
* Double click to import workflow into your alfred 2.
* Enjoy!

> Install Note: If your nodejs was installed via `brew`, `nvm`, or if you even has `oh-my-zsh` or something. Your Alfred may can not found your nodejs binary. Your should double click both `Script Filter` and `Run Script` inside the workflow in your alfred preferences --> workflow page, and change `/usr/local/bin/node` to the actural path, eg: `/Users/leigh/.nvm/versions/node/v4.2.2/bin/node`.(Using `which node` to find this).

## Usage

This workflow's main keyword is `redmine`.

* `redmine config`: Add or delete config.
    * `redmine config add`: Add config, format: `<server> <api-key>`, eg: `redmine config add http://myredmine.org myapikeyvaluefrommypage`
    * `redmine config delete`: Delete config
* `redmine issues`: Fetch 100 issues that assigned to me.
* `redmine issues <keyword>`: Fetch issues that contain the `keyword`(in subject or author)

## Note

* There is a cache in it, it cache the result from api request for every 5 minutes for quick fuzzy search.
* Everything is store in your home dir: `~/.alfred/alfred-redmine/`.

## License

 © [Leigh Zhu](#)
