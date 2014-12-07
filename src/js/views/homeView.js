var HomeView = Backbone.View.extend({

	el: $("#home"),
	template: Handlebars.templates['homeViewTpl'],
	initialize: function() {

	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()))
		return this.rewire()
	},
	rewire: function() {

		$(".contact-trigger").click(function() {

			emailContact = new Contact().set({
				message: ""
			});

			emailContactView = new ContactView({
				model: emailContact
			});

			$('#contactContainer').modal('show')

		});

		
	}

});