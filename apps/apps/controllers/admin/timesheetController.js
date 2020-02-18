const timesheetModel = require('../../models/admin/timesheetModel')
const moment = require('moment')
const userModel = require('../../models/admin/userModel')

module.exports = {
  index: async (req, res) => {
    const listTimesheet = await timesheetModel.getAllTimesheet()
    const convertTime = req.app.locals.convertTime
    const diffTime = req.app.locals.diffTime
    // console.log(req.user);
    // console.log(diffTime(listTimesheet[0].checkIn, listTimesheet[0].checkOut))
    // console.log(moment(listTimesheet[0].checkIn).utcOffset(0, true).format("YYYY-MM-DD HH:mm:ss A Z"))
    // console.log(convertTime(listTimesheet[0]).checkOut == undefined);
    // console.log(new Date().toString());

    // let arrListTimesheet = JSON.parse(JSON.stringify(listTimesheet));

    // console.log(arrListTimesheet);
    // var startDate = new Date("2019-08-02").getTime();
    // var endDate = new Date("2019-08-04").getTime();
    // var resultListTimesheet = arrListTimesheet.filter(function (item) {
    //     var listDates = new Date(item.checkIn).getTime() || {};
    //     console.log(listDates);
    //     return listDates >= startDate && listDates <= endDate
    // });
    // console.log(resultListTimesheet);

    res.render('admin/user/for-admin/timesheet', {
      data: {
        listTimesheet: listTimesheet,
        convertTime: convertTime,
        diffTime: diffTime
      }
    })
  },
  addTimesheet: async (req, res) => {
    const memberProfile = await userModel.getMemberProfile()
    res.render('admin/user/for-admin/add-timesheet', {
      data: {
        memberProfile: memberProfile
      }
    })
  },
  postAddTimesheet: (req, res) => {
    const { memberProfile, checkIn, checkOut } = req.body
    console.log(req.body)
    const data = {
      memberId: memberProfile,
      checkIn: moment(new Date(checkIn)).format('YYYY-DD-MM HH:mm:ss'),
      checkOut: moment(new Date(checkOut)).format('YYYY-DD-MM HH:mm:ss')
    }
    timesheetModel.addTimesheet(data)
    res.status(201).end()
  },
  editTimesheet: async (req, res) => {
    const timesheetId = req.params.timesheetId
    const timesheet = await timesheetModel.getTimesheet(timesheetId)
    const memberProfile = await userModel.getMemberProfile()
    const convertTime = req.app.locals.convertTime
    // console.log(memberProfile);
    // console.log(timesheet);
    res.render('admin/user/for-admin/edit-timesheet', {
      data: {
        timesheet: timesheet,
        memberProfile: memberProfile,
        convertTime: convertTime
      }
    })
  },
  postEditTimesheet: (req, res) => {
    const timesheetId = req.params.timesheetId
    const { memberProfile, checkIn, checkOut } = req.body
    // console.log(req.body);
    // console.log(checkIn);

    const data = {
      memberId: memberProfile,
      checkIn: moment(new Date(checkIn)).format('YYYY-DD-MM HH:mm:ss'),
      checkOut: moment(new Date(checkOut)).format('YYYY-DD-MM HH:mm:ss')
    }
    timesheetModel.editTimesheet(timesheetId, data)
    res.status(201).end()
  },
  deleteTimesheet: (req, res) => {
    const timesheetId = req.params.timesheetId
    timesheetModel.delTimesheet(timesheetId)
    res.redirect('/admin/timesheet')
  }
}
