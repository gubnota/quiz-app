import React from "react";
import Main from "./index";

export default {
  title: "Components/Main",
  component: Main,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => <Main {...args} />;

export const Default = Template.bind({});
Default.args = {
  startQuiz: (questions, time) => {
    console.log("Starting quiz with:", { questions, time });
  },
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
};
