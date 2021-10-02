# Interview Scheduler

[![CircleCI](https://circleci.com/gh/matthew-kelly/lhl-scheduler/tree/master.svg?style=svg)](https://circleci.com/gh/matthew-kelly/lhl-scheduler/tree/master) [![Netlify Status](https://api.netlify.com/api/v1/badges/30095a61-3603-41fd-a8e9-bb73def3b60f/deploy-status)](https://app.netlify.com/sites/scheduler-mk/deploys)

[View the demo](https://scheduler-mk.netlify.app/) (_may take a few seconds for the server on Heroku to boot up, I'm not made of money_)

The Interview Scheduler is a sample single page application built using React, focusing on the process of Data Driven Development using Storybook, as well as Test Driven Development for new features using Jest and Cypress. The app is supported by an API server built with Express.js and PostgreSQL, and supports concurrent users with Websockets.

![Initial Scheduler state](/docs/scheduler-initial.png)
_Initial scheduler state_

![Appointment form](/docs/scheduler-form.png)
_Appointment form_

![Schedule with new appointment](/docs/scheduler-final.png)
_Schedule with new appointment_

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
