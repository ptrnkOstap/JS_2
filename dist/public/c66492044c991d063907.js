var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
var app = new Vue({
  el: '#app',
  methods: {
    getJson: function getJson(url) {
      return fetch(url).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        return console.log(error);
      });
    },
    postJson: function postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        return console.log(error);
      });
    },
    putJson: function putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        return console.log(error);
      });
    },
    deleteJson: function deleteJson(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        } // body: JSON.stringify(data)

      }).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        return console.log(error);
      });
    },
    mounted: function mounted() {
      console.log(this);
    }
  }
});