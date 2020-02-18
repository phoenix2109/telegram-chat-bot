// const connection = require('../../../lib/connect');
module.exports = {
  addTodo: (data) => {
    connection.query('INSERT INTO todo SET ?', data, (error, results, fields) => {
      if (error) throw error
    })
  },
  editTodo: (todoId, fields) => {
    connection.query('UPDATE todo SET ? WHERE todoId = ?', [fields, todoId], (error, results, fields) => {
      if (error) throw error
    })
  },
  delTodo: (todoId) => {
    connection.query('DELETE FROM todo WHERE todoId = ? ', todoId, (error, results, fields) => {
      if (error) throw error
    })
  },
  getTodo: (todoId) => {
    const promise = new Promise((rs, rj) => {
      connection.query('SELECT * FROM todo JOIN category ON todo.catId = category.catId WHERE todoId = ? ', todoId, (error, results, fields) => {
        rs(results)
      })
    })
    return promise
  },
  getAllLabel: () => {
    const promise = new Promise((rs, rj) => {
      connection.query('SELECT * from label ORDER BY labelId ASC', (error, results, fields) => {
        rs(results)
      })
    })
    return promise
  },
  getAllTodo: () => {
    const promise = new Promise((rs, rj) => {
      connection.query(`
                      SELECT * FROM
                        (SELECT * FROM 
                          (SELECT * FROM todo JOIN label ON todo.todoLabel = label.labelId) AS listTodo LEFT JOIN 
                            (SELECT member.memberId as memberId, member.memberName as memberName from member) AS listMember on listTodo.createBy = listMember.memberId) as listTodoMember LEFT JOIN
                              (SELECT member.memberId as assignId, member.memberName as assignName from member) as listAsign on listTodoMember.todoAsign = listAsign.assignId ORDER BY listTodoMember.todoId ASC`, (error, results, fields) => {
        rs(results)
      })
    })
    return promise
  }
  // login: (data) => {
  //     let promise = new Promise( (rs, rj) => {
  //         connection.query('SELECT * FROM user WHERE user_mail = ? AND user_pass = ?', data, (error, results, fields) => {
  //             let result = results.length;
  //             rs(result);
  //         });
  //     })
  //     return promise;
  // },
  // getTodoPagination: (per_row, rows_per_page) => {
  //     let promise = new Promise( (rs, rj) => {
  //         connection.query(`SELECT * FROM user LIMIT ${per_row},${rows_per_page}`, (error, results, fields)=>{
  //             rs(results)
  //         });
  //     })
  //     return promise;
  // }
}
