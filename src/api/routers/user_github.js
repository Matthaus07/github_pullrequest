const GitHubController = require('../controller/controller_github');
const gitHubController = new GitHubController();
//routers for users githubs
module.exports = (app) => {
    const userrouter = GitHubController.routers();
    app.get(userrouter.list, gitHubController.users_list());
    app.post(userrouter.create, gitHubController.user_add());  
};