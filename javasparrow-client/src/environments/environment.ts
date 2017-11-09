// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  apiUrl: "https://javasparrow.herokuapp.com", // JS Server

  imgLoc: "assets/img/", // Local
  fileStorage: "https://javasparrow.s3.amazonaws.com/stories/", // Remote

  // Default points for each event type
  quizPoints: 5,
  openPoints: 10,
  dragPoints: 15,
  codingPoints: 25
};
