import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import './home/home.js'
import './admin/admin.js'
import './body.html'

Template.body.onCreated(function bodyOnCreated () {
  this.state = new ReactiveDict()
  this.state.set('templateName', 'home')
})
Template.body.helpers({
  templateName () {
    const instance = Template.instance()
    return instance.state.get('templateName')
  }
})

Template.body.events({
  'click .blog' (event, instance) {
    instance.state.set('templateName', 'home')
  },
  'click #admin' (event, instance) {
    instance.state.set('templateName', 'admin')
  }
})
