# Contributing

Thanks for your interest in contributing to Enterprise UI's UI Core! :tada:


## Contributing Etiquette

Please see our [Contributor Code of Conduct](https://github.com/enterpriseui/ui-core/blob/master/CODE_OF_CONDUCT.md) for information on our rules of conduct.


## Creating an Issue

* Currently, we are using github issues for bug reports, feature request and support request as well.
(In the future we are planning to move the support to Slack) 

* It is required, that you clearly describe the steps necessary to reproduce the issue you are running into. 
Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

* Non-conforming issues will be closed immediately.

* Issues with no clear steps to reproduce will not be triaged. If an issue is labeled with "needs reply" and receives no further replies from the author of the issue for more than 5 days, it will be closed.

* If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported](https://github.com/enterpriseui/ui-core/issues?utf8=%E2%9C%93&q=is%3Aissue). 
You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

* Next, [create a new issue](https://github.com/enterpriseui/ui-core/issues/new) that thoroughly explains the problem. Please fill out the populated issue form before submitting the issue.


## Creating a Pull Request

* We appreciate you taking the time to contribute! Before submitting a pull request, we ask that you please [create an issue](#creating-an-issue) that explains the bug or feature request and let us know that you plan on creating a pull request for it. 
If an issue already exists, please comment on that issue letting us know you would like to submit a pull request for it. This helps us to keep track of the pull request and make sure there isn't duplicated effort.

* Looking for an issue to fix? Make sure to look through our issues with the [help wanted](https://github.com/enterpriseui/ui-core/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) label!

### Setup

1. Fork the repo.
2. Clone your fork.
3. Make a branch for your change.
4. Run `npm install` (make sure you have [node](https://nodejs.org/en/) and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) installed first)


#### Updates

1. Test. Test. Test. Please take a look at how other tests are written, and you can't write too many tests.
2. If there is a `*.spec.ts` / `*.e2e.ts` file located next to the component, update it to include a test for your change, if needed. If this file doesn't exist, please notify us.
3. Run `npm run test` or `npm run test.watch` to make sure all tests are working, regardless if a test was added.


## Commit Message Format [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

We have very precise rules over how our git commit messages should be formatted. 
This leads to readable messages that are easy to follow when looking through the project history. 
Also we are planning to use the git commit messages to generate our changelog. 
(Ok you got us, we are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)).

`type(scope): subject`

##### *We are using commitizen, so you can always make your commit with it, simply run*
`npm run commit`

*Note: we are forcing these type of commits with [husky](https://www.npmjs.com/package/husky) and [commitlint](https://www.npmjs.com/package/@commitlint/cli) so you do not have to worry about it, that you might mess up*

#### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope
The scope can be anything specifying place of the commit change. For example `componentName`, etc.

#### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* do not capitalize first letter
* do not place a period `.` at the end
* entire length of the commit message must not go over 50 characters
* describe what the commit does, not what issue it relates to or fixes
* **be brief, yet descriptive** - we should have a good understanding of what the commit does by reading the subject


#### Adding Documentation

TODO

## License

By contributing your code to the enterpriseui/ui-core GitHub Repository, you agree to license your contribution under the [Apache 2.0 license](https://github.com/enterpriseui/ui-core/LICENSE).