// const connection = require('../../../lib/connect');
module.exports = {
  addTimesheet: (data) => {
    connection.query('INSERT INTO timesheet SET ?', data, (error, results, fields) => {
      if (error) throw error
    })
  },
  editTimesheet: (timesheetId, fields) => {
    connection.query('UPDATE timesheet SET ? WHERE timesheetId = ?', [fields, timesheetId], (error, results, fields) => {
      if (error) throw error
    })
  },
  delTimesheet: (timesheetId) => {
    connection.query('DELETE FROM timesheet WHERE timesheetId = ? ', timesheetId, (error, results, fields) => {
      if (error) throw error
    })
  },
  getTimesheet: (timesheetId) => {
    const promise = new Promise((rs, rj) => {
      connection.query('SELECT * FROM timesheet WHERE timesheetId = ? ', timesheetId, (error, results, fields) => {
        rs(results)
      })
    })
    return promise
  },
  getAllTimesheet: () => {
    const promise = new Promise((rs, rj) => {
      connection.query('SELECT * FROM timesheet LEFT JOIN (SELECT member.memberId as m_memberId, member.memberName as memberName, member.memberAvatar as memberAvatar from member) as listMember on timesheet.memberId = listMember.m_memberId ORDER BY timesheetId ASC', (error, results, fields) => {
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
  // getTimesheetPagination: (per_row, rows_per_page) => {
  //     let promise = new Promise( (rs, rj) => {
  //         connection.query(`SELECT * FROM user LIMIT ${per_row},${rows_per_page}`, (error, results, fields)=>{
  //             rs(results)
  //         });
  //     })
  //     return promise;
  // }
}
