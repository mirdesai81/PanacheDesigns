# Angular 4 Full Stack E-Commerce App

This project was generated with [angular-cli](https://github.com/angular/angular-cli).

This project is developed using [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 4](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment
* [**B**ootstrap 4](http://www.getbootstrap.com): layout and styles

Other node packages used:
* [Font Awesome](http://fontawesome.io): icons
* [JSON Web Token](https://jwt.io): user authentication
* [Angular 2 JWT](https://github.com/auth0/angular2-jwt): JWT helper for Angular
* [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): password encryption
* [MDB](https://mdbootstrap.com): Material Design For Bootstrap

## Node install
Install [NodeJs](https://nodejs.org/en/download/) version 6.9.4 includes npm 3.10.10.

## MongoDB install
Install [MongoDB](https://www.mongodb.com)

## Angular CLI Install
run `npm i -g @angular/cli`.

## Dependency Install
Navigate to project root path and run `npm install` to install all dependencies

## Run
### Development Server
Run `npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
