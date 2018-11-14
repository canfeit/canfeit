import { Meteor } from 'meteor/meteor'
import { Blogs } from '../blogs'
Meteor.publish('blogs', function () {
  return Blogs.find({ del: {$ne: 'true'} })
})
