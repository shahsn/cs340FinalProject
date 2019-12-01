# NodeJS Web Application Template
This repository contains source code that can be used as a template for building a Node.js web application using Express, Handlebars, and MySQL. You can also use Forever to host the service. Be sure to install the required dependencies by running the following command:

```
npm install
```

You can then start the web application server by running the following command:

```
npm start
```

> **NOTE**: if you need to run the application on a different port, the following command is valid from a Bash terminal:
>
> ```
> PORT=<number> npm start
> ```

## A Note On `forever`
We can use the `forever` library to run our Node.js applications in the background. This allows us to log off the ENGR server without terminating our web application. After installing the required dependencies, you can use the following commands to run the application using forever.

| Action | Command |
|---|---|
| Start a new process | `npx forever start <file>` |
| List running processes | `npx forever list` |
| Stop a running process | `npx forever stop <index>` |
| Stop all running proccesses | `npx forever stopall` |