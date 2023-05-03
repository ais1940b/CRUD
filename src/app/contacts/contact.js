angular.module('encora.contact', [
  'ui.router',
  'ui.bootstrap'
])

  .config(function config($stateProvider) {
    $stateProvider.state('contact', {
      url: '/contacts',
      views: {
        "main": {
          controller: 'contactCtrl',
          templateUrl: 'contacts/contact.tpl.html'
        }
      },
      data: { pageTitle: 'Contacts' }
    });
  })

  .controller('contactCtrl', function ContactCtrl($scope, $http, $uibModal) {


    $scope.getContacts = function () {
      $http({
        method: "GET",
        url:
          "https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts"
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.Contacts = response.data;
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }
      );
    };
    $scope.getContacts();
    $scope.editContact = function (contact) {
      $uibModal.open({
        templateUrl: 'contacts/addeditcontact.tpl.html',
        backdrop: 'static',
        keyboard: false,
        controller: function ($scope, $uibModalInstance) {
          $scope.contact = {
            firstname: contact.firstName,
            lastname: contact.lastName,
            phone: contact.phone,
            id: contact.id
          };
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          $scope.submitForm = function () {
            // Set the 'submitted' flag to true
            $scope.submitted = true;
            if ($scope.contact.firstname && $scope.contact.lastname && $scope.contact.phone) {
              $uibModalInstance.dismiss('cancel');
              addeditContact($scope.contact);
            }
            else {
              alert("Please correct errors!");
            }
          };
        }
      });

    };
    $scope.deleteContact = function (id) {
      $uibModal.open({
        templateUrl: 'contacts/confirmdelete.tpl.html',
        backdrop: 'static',
        keyboard: false,
        controller: function ($scope, $uibModalInstance) {
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          $scope.ok = function () {
            $uibModalInstance.close();
            console.log('dssd');
            deletecontactData(id);
          };
        }
      });

    };
    $scope.addContact = function () {
      $uibModal.open({
        templateUrl: 'contacts/addeditcontact.tpl.html',
        backdrop: 'static',
        keyboard: false,
        controller: function ($scope, $uibModalInstance) {
          $scope.contact = {
            firstname: "",
            lastname: "",
            phone: ""
          };
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          $scope.submitForm = function () {
            // Set the 'submitted' flag to true
            $scope.submitted = true;
            if ($scope.contact.firstname && $scope.contact.lastname && $scope.contact.phone) {
              $uibModalInstance.dismiss('cancel');
              addeditContact($scope.contact);
            }
            else {
              alert("Please correct errors!");
            }
          };
        }
      });

    };
    function addeditContact(contact) {
      if (contact.id > 0) {
        for (var i = 0; i < $scope.Contacts.length; i++) {
          if ($scope.Contacts[i].id === contact.id) {
            $scope.Contacts[i].firstName = contact.firstname;
            $scope.Contacts[i].lastName = contact.lastname;
            $scope.Contacts[i].phone = contact.phone;
            break;
          }
        }
        alert("Contact Edited");
      } else {
        var maxId = 0;
        maxId = $scope.Contacts.reduce(function (p, n) { return (p = p > n.id ? p : n.id); }, 0);
        $scope.Contacts.push({
          id: maxId + 1,
          firstName: contact.firstname,
          lastName: contact.lastname,
          phone: contact.phone,
        });
        alert("Contact Added");
      }
    }
    function deletecontactData(id) {
      console.log('id', id);
      var requiredIndex = $scope.Contacts.findIndex(function (el) {
        return parseInt(el.id, 10) === parseInt(id, 10);
      });
      if (requiredIndex === -1) {
        return false;
      }
      $scope.Contacts.splice(requiredIndex, 1);
    }
  });
