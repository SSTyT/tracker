'use strict';
angular.module('tracker')
  .factory('milestone', [function milestoneFactory() {

    var Milestone = function(title, skippable) {
      this.title = title;
      this.skippable = skippable;
    }

    Milestone.prototype = {
      title: '',
      skippable: false,
      skipped: false,
      date: '',
      completed: false
    }

    return {
      create: function(title, skippable) {
        return new Milestone(title, skippable);
      }
    };
  }]);
