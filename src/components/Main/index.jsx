import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import mindImg from "../../images/mind.svg";

import { COUNTDOWN_TIME } from "../../constants";
import { loadCategories } from "../../constants/categories";

import { shuffle } from "../../utils";
import { loadQuestionsForCategory } from "../../utils/questionLoader";

import Offline from "../Offline";

const Main = ({ startQuiz }) => {
  // Load saved preferences from localStorage
  const savedPreferences = JSON.parse(
    localStorage.getItem("quizPreferences") || "{}"
  );

  const [category, setCategory] = useState(savedPreferences.category || "0");
  const [numOfQuestions, setNumOfQuestions] = useState(
    savedPreferences.numOfQuestions || 0
  );
  const [countdownTime, setCountdownTime] = useState(
    savedPreferences.countdownTime || {
      hours: 1,
      minutes: 0,
      seconds: 0,
    }
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [availableQuestionCounts, setAvailableQuestionCounts] = useState([
    { key: 0, text: "All Questions", value: 0 },
  ]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories first
  useEffect(() => {
    const initializeCategories = async () => {
      setLoading(true);
      try {
        const { flattenedCategories } = await loadCategories();
        setCategories(flattenedCategories);
      } catch (error) {
        setError({
          message: <p>Failed to load categories. Please refresh the page.</p>,
        });
      }
      setLoading(false);
    };

    initializeCategories();
  }, []);

  // Generate question count options based on total available questions
  useEffect(() => {
    const generateQuestionCountOptions = async () => {
      if (!category || loading) return;

      const selectedCategory = categories.find((cat) => cat.value === category);
      const questions = await loadQuestionsForCategory(selectedCategory);
      const totalQuestions = questions.length;

      const counts = [{ key: 0, text: "All Questions", value: 0 }];
      for (let i = 5; i <= Math.min(50, totalQuestions); i += 5) {
        counts.push({ key: i, text: `${i} Questions`, value: i });
      }
      setAvailableQuestionCounts(counts);
    };

    generateQuestionCountOptions();
  }, [category, categories, loading]);

  // Save preferences whenever they change
  useEffect(() => {
    localStorage.setItem(
      "quizPreferences",
      JSON.stringify({
        category,
        numOfQuestions,
        countdownTime,
      })
    );
  }, [category, numOfQuestions, countdownTime]);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions !== undefined &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const formatQuestion = (question) => {
    if (!question.includes("```")) return question;

    const [text, ...codeBlocks] = question.split("```");
    return (
      <>
        {text}
        {codeBlocks.map((block, index) => {
          const [language, ...code] = block.split("\n");
          return (
            <SyntaxHighlighter
              key={index}
              language={language}
              style={tomorrow}
              customStyle={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {code.join("\n").replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        })}
      </>
    );
  };

  const fetchData = async () => {
    setProcessing(true);
    if (error) setError(null);

    try {
      const selectedCategory = categories.find((cat) => cat.value === category);
      const questions = await loadQuestionsForCategory(selectedCategory);

      const shuffledQuestions = shuffle([...questions]);
      const selectedQuestions =
        numOfQuestions === 0
          ? shuffledQuestions
          : shuffledQuestions.slice(
              0,
              Math.min(numOfQuestions, shuffledQuestions.length)
            );

      selectedQuestions.forEach((element) => {
        element.formattedQuestion = formatQuestion(element.question);
        element.options = shuffle([
          element.correct_answer,
          ...element.incorrect_answers,
        ]);
      });

      setTimeout(() => {
        setProcessing(false);
        startQuiz(
          selectedQuestions,
          countdownTime.hours + countdownTime.minutes + countdownTime.seconds
        );
      }, 100);
    } catch (error) {
      setTimeout(() => {
        setProcessing(false);
        setError({
          message: (
            <p>
              Failed to load questions for this category. Please try another
              category.
            </p>
          ),
        });
      }, 100);
    }
  };

  if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>The Ultimate Trivia Quiz</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <p>In which category do you want to play the quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={categories}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing || loading}
                />
                <br />
                <p>How many questions do you want in your quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={availableQuestionCounts}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <p>Please select the countdown time for your quiz.</p>
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select Hours"
                  header="Select Hours"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? "Processing..." : "Play Now"}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing || loading}
                />
                {/* <Button
                  secondary
                  size="big"
                  icon="graduation cap"
                  labelPosition="left"
                  content={processing ? "Processing..." : "Train Now"}
                  onClick={() => {
                    // Add your training mode logic here
                    fetchData();
                  }}
                  disabled={!allFieldsSelected || processing || loading}
                /> */}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
