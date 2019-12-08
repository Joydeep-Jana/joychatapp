const db = require("../connection");

module.exports = 
{
    getAllUsers: function(info)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = 
            `
                SELECT 
                    *
                FROM
                    chat_users;
            
            `;
            db.query(sql, (err, result)=>
            {
                if (err)
                {
                    reject(err);
                }
                resolve(result);
            });
        })
    },
    getAllgroups: function(socket)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = 
            `
            SELECT 
                cg.*
            FROM
                chat_groups cg
                    INNER JOIN
                chat_group_to_users cgtu ON cg.id = cgtu.group_id
                    AND cgtu.user_id = ${socket.userId}
            
            `;
            db.query(sql, (err, result)=>
            {
                if (err)
                {
                    reject(err);
                }
                resolve(result);
            });
        })
    },

    isValidUser: async function(data)
    {
        return new Promise(function(resolve, reject)
        {
            let sql = 
            `   
            SELECT 
                *
            FROM
                chat_users
            WHERE
                username = '${data.username}' AND password = '${data.password}'
            `;
            db.query(sql, (err, result)=>
            {
                if (err)
                {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
}