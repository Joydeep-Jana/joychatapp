const db = require("../connection");

module.exports = 
{
    save: async function(data)
    {
        return new Promise(function(resolve, reject)
        {
            var date = new Date(); 
            let dateString = date.toISOString().split('T')[0] + ' '  
                        + date.toTimeString().split(' ')[0]; 
            let sql = 
            `
            INSERT INTO 
            chat_messages (source_user_id, message_body, is_group_chat, destination_user_id, timestamp) 
            VALUES ('${data.sourceId}', '${data.messageBody}', 'n', '${data.destinationId}', '${dateString}');
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

    saveInGroup: async function(data)
    {
        return new Promise(function(resolve, reject)
        {
            var date = new Date(); 
            let dateString = date.toISOString().split('T')[0] + ' '  
                        + date.toTimeString().split(' ')[0]; 
            let sql = 
            `
            INSERT INTO 
            chat_messages (source_user_id, message_body, is_group_chat, destination_group_id, timestamp) 
            VALUES ('${data.sourceId}', '${data.messageBody}', 'y', '${data.destinationId}', '${dateString}');
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

    getChatHistory: function(info)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = 
            `
                SELECT 
                    cm.id,
                    cm.message_body,
                    cm.source_user_id,
                    src.username AS source,
                    cm.destination_user_id,
                    des.username AS destination,
                    cm.timestamp
                FROM
                    chat_messages cm
                        INNER JOIN
                    chat_users src ON src.id = cm.source_user_id
                        INNER JOIN
                    chat_users des ON des.id = cm.destination_user_id
                WHERE
                    source_user_id IN (${info.sourceId} , ${info.destinationId})
                        AND destination_user_id IN (${info.sourceId} , ${info.destinationId})
                        AND is_group_chat = 'n'
                ORDER BY timestamp
            
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
    getChatHistoryForGroup: function(info)
    {
        return new Promise(function(resolve, reject)
        {
            var sql = 
            `
                SELECT 
                    cm.id,
                    cm.message_body,
                    cm.source_user_id,
                    src.username AS source,
                    cm.timestamp
                FROM
                    chat_messages cm
                        INNER JOIN
                    chat_users src ON src.id = cm.source_user_id
                WHERE
                destination_group_id = ${info.groupId}
                        AND is_group_chat = 'y'
                ORDER BY timestamp
            
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
    }
}