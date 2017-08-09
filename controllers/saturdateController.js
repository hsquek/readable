var Saturdate = require('../models/saturdate')
var formatDate = require('../public/javascript/formatDate')

var saturdateController = {
  listAll: function (req, res) {
    Saturdate.find({}, function (err, allSaturdates) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/')
      } else {
        res.render('history/index', {
          allSaturdates: allSaturdates.sort(function (date1, date2) {
            if (date1.date < date2.date) return -1
            else if (date1.date > date2.date) return 1
            else return 0
          }),
          formatDate: formatDate
        })
      }
    })
  },

  create: function (req, res) {
    var newSaturdate = new Saturdate({
      date: req.body.date
    })
    newSaturdate.save(function (err, savedSaturdate) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/history')
      } else {
        req.flash('success', formatDate(savedSaturdate.date) + ' successfully added!')
        res.redirect('/history')
      }
    })
  },

  delete: function (req, res) {
    Saturdate.findByIdAndRemove(req.params.id, function (err, chosenSaturdate) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/history')
      } else {
        req.flash('success', formatDate(chosenSaturdate.date) + ' successfully deleted!')
        res.redirect('/history')
      }
    })
  }

}

module.exports = saturdateController