import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Blogs } from '../../api/blogs/blogs.js'
import './home.html'

Template.home.onCreated(function () {
  Meteor.subscribe('blogs')
})

Template.home.helpers({
  blogsData () {
    return Blogs.find({})
  }
})

Template.blog.events({
  'click .delete' () {
    Meteor.call('blogs.remove', this._id)
  }
})
