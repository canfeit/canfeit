import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

const Blogs = new Mongo.Collection('blogs')

Meteor.methods({
  'blogs.remove' (id) {
    check(id, String)
    Blogs.update(id, { $set: { del: 'true' } })
  }
})

Blogs.attachSchema(new SimpleSchema({
  del: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    label: '标题',
    max: 200
  }
}))

if (Meteor.isClient) window.Blogs = Blogs
export { Blogs }
