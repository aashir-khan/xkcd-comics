xkcd comics

This application follows a (stripped-down) Domain-Driven Design architecture. More information can be seen [here](https://resocoder.com/2020/03/09/flutter-firebase-ddd-course-1-domain-driven-design-principles/). In addition, this application is divided into modules, with currently there only being a students module, but of which can be extended to include more modules as the domain scope increases.

In addition, this application implements environment-dependent dependency injection (DI) using the awilix package. It also uses functional programming concepts such as Either to handle success and failure states gracefully. More information [here](https://medium.com/inato/expressive-error-handling-in-typescript-and-benefits-for-domain-driven-design-70726e061c86).

This application uses sum types/sealed unions using the [unionize](https://github.com/pelotom/unionize#match-expressions) package for representing various failure types and various redux states elegantly.

Firebase is used to store the view count for each comic strip.

There exists a `.env.template` file that can be renamed to `.env` to populate the environment variables to use in the application.
