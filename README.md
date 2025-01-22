<h1 align="center">
  <a href="https://gubnota.github.io/quiz-app/">
    QuizApp
  </a>
</h1>
<p align="center">
  <a href="https://github.com/gubnota/quiz-app/actions?query=workflow%3A%22Node.js+CI%22">
    <img src="https://github.com/gubnota/quiz-app/workflows/Node.js%20CI/badge.svg" alt="Node.js CI" />
  </a>
  <!-- <a href="https://github.com/gubnota/quiz-app/releases">
    <img src="https://img.shields.io/github/v/release/gubnota/quiz-app" alt="GitHub Release (latest by date)" />
  </a> -->
  <a href="https://github.com/gubnota/quiz-app/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/gubnota/quiz-app" alt="License" />
  </a>
</p>

<p align="center">
  QuizApp is a free and open-source quiz application that lets you play fully customized quizzes right in the browser.
  It's a fork of another repo: <a href="https://github.com/SafdarJamal/quiz-app">SafdarJamal/quiz-app</a>
</p>

![QuizApp](https://github.com/user-attachments/assets/e35577fb-84b9-4ca7-a6d5-c5d77f5770f3)

## Built with

- [React](http://react.dev)
- [Semantic UI](https://semantic-ui.com)

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/gubnota/quiz-app.git
cd quiz-app
```

Install dependencies:
I personally use `bun` and `vite`. You can use `npm` instead. Make sure you installed npm or bun on your local machine before building it. To use with your trivia db you don't need to build it. Have a look at data dir and create appropriate questions and categories.

```
bun i
```

Now, you can start a local web server by running:

```
bun dev
```

And then open http://localhost:5173 to view it in the browser.

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| bun dev   | Runs the app in the development mode.                                   |
| bun test      | Run all tests                 |
| bun build | Builds the app for production to the `build` folder.                    |
| bun preview | Preview already built project at 4173 port |

## Credits

This app is maintained by [Larry Moore](https://github.com/gubnota).

## License

Code released under the [MIT license](https://github.com/SafdarJamal/quiz-app/blob/master/LICENSE).
