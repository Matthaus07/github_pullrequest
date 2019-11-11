const bd = require("../config/bd")

class UserGitHubController {
    static routers() {
        return {
            list: '/list',
            create: '/create',
        }
    }

    //search list of added users

    users_list() {
        return async (req, res) => {
            try {
                const query = 'SELECT * FROM githubusers';
                const bd_query = await bd.query(query);
                res.status(200).send({ data: bd_query.rows });
            }
            catch (error) {
                return res.status(400).json({send:"error", error: error.message })

            }
        }
    }
    //add new users

    user_add() {
        return async (req, res) => {
            try {
                const query = 'INSERT INTO githubuSers(username,title,createatpull, state,urlpull) VALUES($1, $2, $3,$4,$5) RETURNING *'
                const values = [req.body.username, req.body.title, req.body.createatpull, req.body.state, req.body.urlpull]

                const bd_query = await bd.query(query, values)
                res.status(200).send([{ send: "success!", data: bd_query.rows }])
            }
            catch (error) {
                return res.status(400).json({ error: error.message })
            }
        }
    }
}

module.exports = UserGitHubController