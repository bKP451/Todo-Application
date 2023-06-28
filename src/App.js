import ProjectsListing from "./components/ProjectsListing/ProjectsListing";
import "./App.css";

function App() {
  const initalProjects = [
    {
      projectId: 0,
      projectTitle: "Get yourself a umbrella",
      tasks: [
        {
          taskId: 1,
          taskTitle: "Get to the Umbrella Shop",
          taskDescription:
            "You have to know where to get the good umbrellas. You can ask your pals about it.",
        },
        {
          taskId: 2,
          taskTitle: "Select the color of the Umbrella",
          taskDescription:
            "The color the your umbrella is very important. The color of the umbrella sets your mood. Which color makes you pleasant ?",
        },
      ],
    },
    {
      projectId: 1,
      projectTitle: "Swimming Lessons",
      tasks: [
        {
          taskId: 1,
          taskTitle: "Visit a swimming trainer",
          taskDescription:
            "You got to visit a swimming trainer. He/She will have proper information to learn swimming",
        },
        {
          taskId: 2,
          taskTitle: "Explore water bodies",
          taskDescription:
            "If you want to be a real life swimmer. You have got to go into the rivers, lakes and seas. It will be good for you.",
        },
      ],
    },
  ];

  return (
    <div className="App">
      <div className="heading-wrapper">
        <h1 className="heading">TO-DOOOOO</h1>
      </div>
      <div className="body-section">
        <ProjectsListing allProjects={initalProjects} />
      </div>
    </div>
  );
}

export default App;
