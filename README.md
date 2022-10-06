<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

# Timberwolves Game Tickets Search and Filter

This is the Timberwolves Single Game Tickets Generator Search and Filter Feature, which displays all the games for the
year dynamically via use of Airtable.

**PLEASE NOTE** that this page is largely **UNFINISHED** and was a basic port of
the [Ticket Promos project](https://github.com/wolveslynx/tw22-ticket-promos) so we could get some single games tickets
up during 2022 playoffs. I never got around to finishing this project and it would need some big R&R to get up for the
real deal. We do have an old version/backup of the single game tickets page (Drupal era) in the Bitbucket repo, which
pairs with the [Single Game Tickets Generator project](https://github.com/wolveslynx/single-game-tickets-generator), if
you are unable to get this project up and running before next season.

## What this page does

### Data

The `useFetchAllData.js` hook will go and fetch the NBA season schedule data and the data stored in
the [Airtable database](https://airtable.com/appCz9mD9R5QxRckF/tblZ5POqnJ5e0jz6S/viwpMhrJDFY2JfMIq?blocks=hide), compare
the games by their gids, and will spit out a concatenated array of all the games which match with their extra
information (buy links, giveaways and theme info, etc). The tickets list checks whether the game date has passed, and if
not, will display upcoming games while removing old games.

### Optional components

There are a few components that can be brought in as needed, such as the MarketoForm and hook to display a sign up form,
or the Banner component to display an ad-like banner with a clickable link to some other source (such as the memberships
page).

### Gatsby Versioning and the Script Component

Recently, this project was brought up to speed with Gatsby v4.5.0 in order to make use of the
new [Script component](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-script/) in order to embed the
NBA header/footer script. `gatsby-browser.js` and `gatsby-ssr.js` import the `gatsby-shared.js` file to make use of the
wrapRootElement API function which contains the scripts. Using both `gatsby-browser.js` and `gatsby-ssr.js` consistently
this way [is recommended](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-script/) by Gatsby.

### what the heck does the gatsby-node.js file do??

It's a very confusing and ugly file, but I've been including it in all Gatsby projects ever since we switched to the
Bitbucket repo.

Why?

We don't have the ability to control or break the cache from the server-side. So, what this file does is that it
essentially re-hashes files on build time so that the repo is forced to recognize them as "new" files and thus, update
the cache/browser when a new build gets committed. This is my only tried and true method of cache-busting for Gatsby
with our repo set-up. **DO NOT REMOVE UNLESS YOU KNOW WHAT YOU ARE DOING!**

## Notes

Currently, this page is set to a "post-season" state because there are no current games in Airtable for this season (
Timberwolves 2021-22). (You can test this by putting some dummy data in Airtable from the (currently in-season) Lynx
schedule, but keep in mind that the tickets list automatically filters out games that have already passed, which is why
you can't use a previous season's schedule feed).

When you're ready for the next season, you can remove the extra Marketo form and banner components from the `index.js`
page, and change the copy as needed.

To pull in data from the next season, change the `year` variable in the `useFetchAllData.js` hook and make sure you put
the games with matching ids in airtable.

## Future Development

This page will ideally have ways to filter games by opponent, game month, theme nights, etc. like we had previously on
the last single games page, which is usually a big marketing objective/request. I did not have enough time in season to
implement this, but would consider it the next most important feature of this page before the next season.

It's also very messy and deserves a lot of tune-up, if you can get the time. It's an important page.

## Available Scripts

1. Run development environment

   ```shell
   npm run start
   ```

2. Build for dev, which builds a production ready build, minus the CDN prefix on resources, so you can then run a local
   server and test the final build before pushing to production.

   ```shell
   npm run build:dev
   npm run serve
   ```

3. Build for prod, which will make use of the `--prefix-paths` flag to prepend the CDN path for production.

   ```shell
   npm run build:prod
   ```

## 🚀 Quick start

1. **Start developing.**

   Navigate into your new site’s directory and start it up.

   ```shell
   cd game-search-filter
   gatsby develop
   ```

1. **Open the source code and start editing!**

   Your site is now running at `http://localhost:8000`!

   _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment
   with querying your data. Learn more about using this tool in
   the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries)
   ._

   Open the `game-search-filter` directory in your code editor of choice and edit `src/pages/index.js`. Save your
   changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1. **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages)
   are automatically installed.

2. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (
   what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3. **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4. **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep
   the formatting of your code consistent.

5. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify
   information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to
   include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for
   more detail).

6. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of
   the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow
   customization/extension of default Gatsby settings affecting pieces of the site build process.

7. **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of
   the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) (if any).
   These allow customization of default Gatsby settings affecting server-side rendering.

8. **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a
   placeholder and replace it with your own license.

9. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact
   versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

10. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name,
    author, etc). This manifest is how npm knows which packages to install for your project.

11. **`README.md`**: A text file containing useful reference information about your project.

<!-- AUTO-GENERATED-CONTENT:END -->
