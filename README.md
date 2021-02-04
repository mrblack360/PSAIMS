[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](LICENCE)
[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)](https://npmjs.com)
[![GitHub contributors](https://img.shields.io/badge/contributors-7-green.svg?style=flat)](https://github.com/mrblack360/PSAIMS/graphs/contributors)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-green)
![Maintainability](https://img.shields.io/badge/maintainability-B-yellow)


# PSAIMS

Primary School Academic Information Management System, PSAIMS makes it easy to collect, process, analyse and disseminate Tanzanian based primary school academic information. PSAIMS works with students information and is used by teachers to evaluate and grade students's performances.

## Documentation

- [Project Proposal](Proposal.md)
- Project Design
  - [Archtecture Design](Designs/Architecture_Design/index.md)
  - [User Interface Design](Designs/Interface_Design/interface-design.md)
  - [Program Design](Designs/Program_Design/Program_Design.md)
  - [Data Storage Design](Designs/Database_Design/database_design.md)
- [Project Tasks](Tasks/tasks.md)
- [Project Risks](Risks/index.md)
- [Installation Guide](#installation-guide)
- [PSAIMS Documentation](Documentation.md)


## About PSAIMS

We think PSAIMS will help teachers to report correct student information after a thorough and reliable analysis and evaluation that PSAIMS does.

## Installation Guide
### Prerequisites

1. [NodeJs (14 or higher)](https://nodejs.org)
2. npm (6.14.0 or higher), can be installed by running `apt install npm`
3. git, can be installed by running `apt install git`
4. [MYSQL](https://www.mysql.com/) database server

### Setup

Clone repository

```bash
 git clone https://github.com/mrblack360/PSAIMS.git
```

Navigate to application root folder

```bash
cd PSAIMS/Psaims
```

Install all required dependencies for the app

```bash
npm install
```

### Development server

To start development server

`npm start`

Navigate to [http://localhost:4200](http://localhost:4200).

This command will require `nodejs/database/conf.js` file available in the root of your source code, usually this file has this format

```js
var databaseConf = {
  host: "localhost",
  user: "root",
  password: "",
};

exports.databaseConf = databaseConf;

```

We have provided `nodejs/database/conf-example.js` file as an example, make a copy and rename to `nodejs/database/conf.js` and then ensure to fill in the correct database credentials for you MYSQL database.

### Build

To build the project run

`npm run build`

The build artifacts will be stored in the `dist/`, this will include a zip file ready for deploying to any DHIS2 instance.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Help

In case of any concern, dont hesitate to let us know through our contacts listed below.

1. [Kakoti, Marlon David](mailto:marlon24david@gmail.com?subject=PSAIMS-Help)
2. [Maswi, Mussa Raphael](https://twitter.com/maswimrt)
3. [Kilasara, Triphonia Shangwe](mailto:shangwe98@gmail.com?subject=PSAIMS-Help)
4. [Ngao, Prince Walter](mailto:prync99@gmail.com?subject=PSAIMS-Help)
5. [Mvamba, Christian M](mailto:mvamba.christian@gmail.com?subject=PSAIMS-Help)
6. [Maungila, Charles Lwanga](mailto:clwanga1095@gmail.com?subject=PSAIMS-Help)
7. [Mawazo, Kennedy Christopher](mailto:christopherkennedy459@gmail.com?subject=PSAIMS-Help)

**Love PSAIMS? Give our repo a start** :star:
