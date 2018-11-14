import { Blogs } from '../imports/api/blogs/blogs.js'
import { Meteor } from 'meteor/meteor'
import '../imports/api/blogs/server/publish.js'

Meteor.startup(() => {
  // code to run on server at startup
})
Blogs.allow({
  insert () { return true },
  update () { return true },
  remove () { return true }
})
